import Head from 'next/head';
import React from 'react';
import { GitHub, LinkedIn, Mail } from '@material-ui/icons';
import classes from '../pages/generalStyles.module.css';
import Link from 'next/link';
import { Divider } from '@material-ui/core';
import clsx from 'clsx';

const email = 'tyken628@gmail.com';

export default function DefaultLayout(props) {
	return (
		<div className={classes.container}>
			<Head>
				<title>{props.title ?? 'Tyler Kennedy'}</title>
			</Head>

			<header>
				<Link href="https://tylerkennedy.dev/">
					<span className={classes.headerLink}>Home</span>
				</Link>
				<Divider className={classes.verticalDivider} orientation="vertical" flexItem />
				<Link href="https://tylerkennedy.dev/AboutMe">
					<span className={classes.headerLink}>About Me</span>
				</Link>
				<Divider className={classes.verticalDivider} orientation="vertical" flexItem />
				<Link href="https://tylerkennedy.dev/WorkExperience">
					<span className={classes.headerLink}>Work Experience</span>
				</Link>
				<Divider className={classes.verticalDivider} orientation="vertical" flexItem />
				<Link href="https://tylerkennedy.dev/Projects">
					<span className={classes.headerLink}>Projects</span>
				</Link>
				<Divider className={classes.verticalDivider} orientation="vertical" flexItem />
				<Link href="https://tylerkennedy.dev/Blog">
					<span className={classes.headerLink}>Blog</span>
				</Link>
			</header>

			<main className={props.className ?? ''}>{props.children}</main>

			<footer>
				<div className={classes.leftFooter}>
					<a href="https://github.com/Zanoro9000" target="_blank" rel="noopener noreferrer" className={classes.footerLink}>
						<GitHub className={classes.footerIcon} />
					</a>
					<a href="https://www.linkedin.com/in/tyler-kennedy-913204118/" target="_blank" rel="noopener noreferrer" className={classes.footerLink}>
						<LinkedIn className={classes.footerIcon} />
					</a>
					<a href={`mailto:${email}`} className={classes.footerLink}>
						<Mail className={classes.footerIcon} />
					</a>
				</div>

				<div className={classes.centerFooter}>&#169; Tyler Kennedy {new Date().getFullYear()}</div>

				<div className={classes.rightFooter}>{email}</div>
			</footer>
		</div>
	);
}
