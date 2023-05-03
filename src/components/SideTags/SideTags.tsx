import React from "react";
import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { PostsActions } from "../../store/posts";
import { useAppDispatch } from "../../store";
import TagIcon from "@mui/icons-material/Tag";

interface SideTagsProps {
	tags?: string[];
}

export function SideTags({ tags }: SideTagsProps) {
	const dispatch = useAppDispatch();

	const clickTag = (tag: string) => {
		dispatch(PostsActions.changeTagData(tag));
		dispatch(PostsActions.requestPostsWithTags());
	};
    
	return (
		<List>
			{tags?.map((tag: string) => (
				<ListItem disablePadding>
					<ListItemButton onClick={() => clickTag(tag)}>
						<ListItemIcon>
							<TagIcon />
						</ListItemIcon>
						<ListItemText primary={tag} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
