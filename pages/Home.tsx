import React, { useEffect, useState } from 'react';
import generalClasses from './generalStyles.module.css';
import DefaultLayout from '../layout/DefaultLayout';
import { IOtherName } from '../API/MovieInterfaces';
import { getAPI, getSource, IAPIGet } from '../API/MobieAPI';
import { toast } from 'react-toastify';
import { toastError } from '../utils/Functions';
import { TextField, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	const [options, setOptions] = useState<IOtherName[] | undefined>();
	const loading = !options || options?.length === 0;

	useEffect(() => {
		const source = getSource();
		const call: IAPIGet<'Title'> = { type: 'Title', token: source.token };
		getAPI(call)
			.then((response) =>
				setOptions(
					response
						// Use alternate names as well for the search/select box
						.flatMap((r) =>
							r.otherNames?.length > 0
								? r.otherNames
								: [
										//provide a default title if no titles available
										{
											id: -1,
											titleId: r.titleId,
											titleNameLanguage: 'ENGLISH',
											titleNameType: 'Primary',
											titleNameSortable: r.titleNameSortable,
											titleName: r.titleName,
										},
								  ]
						)
						.sort((a, b) => {
							//should be extracted to another function/class somewhere
							if (a.titleNameLanguage < b.titleNameLanguage) return -1;
							if (a.titleNameLanguage > b.titleNameLanguage) return 1;
							if (a.titleNameSortable < b.titleNameSortable) return -1;
							if (a.titleNameSortable > b.titleNameSortable) return 1;
						})
				)
			)
			.catch((err) => toastError(toast, err));

		return source.cancel;
	}, []);

	const onSelectTitle = (e, value: IOtherName) => {
		if (value && typeof value !== 'string') router.push(`/titles/${value.titleId}`);
	};

	return (
		<DefaultLayout>
			<h1 className={generalClasses.title}>TitleSearch</h1>
			<p className={generalClasses.description}>Search for a movie title to get started!</p>

			<div className={generalClasses.searchBar}>
				<Autocomplete
					getOptionSelected={(option, value) => option.titleId === value.titleId}
					getOptionLabel={(option) => option.titleName}
					groupBy={(option) => option.titleNameLanguage}
					onChange={onSelectTitle}
					options={options ?? []}
					loading={loading}
					fullWidth
					renderInput={(params) => (
						<TextField
							{...params}
							placeholder="Search here!"
							variant="outlined"
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? <CircularProgress color="inherit" size={20} /> : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
			</div>
		</DefaultLayout>
	);
}
