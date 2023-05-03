import React from "react";
import "./UserInfo.css";

interface UserInfoProps {
	avatarUrl: string;
	fullName: string;
	additionalText: string;
}

export function UserInfo({
	avatarUrl,
	fullName,
	additionalText,
}: UserInfoProps) {
	const time = new Date();
	time.setTime(Date.parse(additionalText));

	return (
		<div className="userInfo_root">
			<img className="userInfo_avatar" src={avatarUrl} alt={fullName} />
			<div className="userInfo_userDetails">
				<span className="userInfo_username">{fullName}</span>
				<span className="userInfo_additional">
					{time.toLocaleString()}
				</span>
			</div>
		</div>
	);
}
