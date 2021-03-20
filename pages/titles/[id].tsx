import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import classes from './titles.module.css';
import { useRouter } from 'next/router';
import { getAPI, getSource, IAPIGet } from '../../API/MobieAPI';
import { ITitle } from '../../API/MovieInterfaces';
import { toastError } from '../../utils/Functions';
import { toast } from 'react-toastify';
import { Grid, IconButton, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

export default function TitleId() {
	const router = useRouter();
	const { id: strId } = router.query;
	const id = parseInt(strId as string);

	const [title, setTitle] = useState<ITitle | undefined>();

	useEffect(() => {
		if (!isNaN(id)) {
			const source = getSource();
			const call: IAPIGet<'Title'> = { type: 'Title', token: source.token, id: [id] };
			getAPI(call)
				.then((response) => {
					let title = response?.[0];
					if (!title) toastError(toast, 'Unable to find title!');
					title.awards = title.awards?.sort((a, b) => (a.awardYear > b.awardYear ? -1 : 1)); // > because desc
					title.genres = title.genres?.sort((a, b) => (a.name < b.name ? -1 : 1));
					title.otherNames = title.otherNames?.sort((a, b) => (a.titleNameSortable < b.titleNameSortable ? -1 : 1));
					title.titleParticipants = title.titleParticipants?.sort((a, b) => (a.participant?.name < b.participant?.name ? -1 : 1));
					setTitle(title);
				})
				.catch((err) => toastError(toast, err));

			return source.cancel;
		}
	}, [id]);

	return (
		<DefaultLayout className={classes.noTopPadding}>
			<div className={classes.navHeader}>
				<IconButton onClick={() => router.push('/')}>
					<ArrowBack />
				</IconButton>
			</div>
			<h1 className={classes.title}>{title ? `${title?.titleName} (${title?.releaseYear})` : 'Loading...'}</h1>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<ListSubheader className={classes.subHeader}>Genre(s)</ListSubheader>
					<List className={classes.list}>
						{title?.genres?.map((genre, i) => (
							<ListItem key={'genre_' + i}>
								<ListItemText primary={genre.name} />
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={12} sm={6}>
					<ListSubheader className={classes.subHeader}>Awards</ListSubheader>
					<List className={classes.list}>
						{title?.awards?.map((award, i) => (
							<ListItem key={'award_' + i}>
								<ListItemText
									primary={`${award.award1} - (${award.awardCompany})`}
									secondary={`${award.awardWon ? 'Won' : 'Nominated'} - (${award.awardYear})`}
								/>
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={12} sm={6}>
					<ListSubheader className={classes.subHeader}>Names</ListSubheader>
					<List className={classes.list}>
						{title?.otherNames?.map((name, i) => (
							<ListItem key={'name_' + i}>
								<ListItemText primary={`${name.titleName} - (${name.titleNameLanguage})`} secondary={name.titleNameType} />
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={12} sm={6}>
					<ListSubheader className={classes.subHeader}>Participants</ListSubheader>
					<List className={classes.list}>
						{title?.titleParticipants?.map((titlePart, i) => (
							<ListItem key={'participant_' + i}>
								<ListItemText primary={titlePart?.participant?.name} secondary={`${titlePart?.roleType} ${titlePart.isOnScreen ? '- On-Screen' : ''}`} />
							</ListItem>
						))}
					</List>
				</Grid>
				<Grid item xs={12}>
					<ListSubheader className={classes.subHeader}>Story Line</ListSubheader>
					<List className={classes.list}>
						{title?.storyLines?.map((story, i) => (
							<ListItem key={'story_' + i}>
								<ListItemText primary={story.type} secondary={story.description} />
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		</DefaultLayout>
	);
}
