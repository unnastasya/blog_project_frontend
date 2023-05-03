import { Button, Paper, TextField } from "@mui/material";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useAppSelector } from "../../store";
import { DataSelector, isAuthUserSelector } from "../../store/auth";
import SimpleMdeReact from "react-simplemde-editor";
import "./AddPost.css";
import axios from "axios";
import qs from "qs";
import { getOnePost } from "../../api/posts";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { allTagsSelector } from "../../store/posts";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

export function AddPost() {
	const { id } = useParams();
	const navigate = useNavigate();
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const isAuth = useAppSelector(isAuthUserSelector);
	const ActiveUser = useAppSelector(DataSelector);
	const [title, setTitle] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);
	const [imageURL, setImageURL] = useState<string>("");
	const [tagsData, setTagsData] = useState(useAppSelector(allTagsSelector));
	const [tagInput, setTagInput] = useState("");

	const options = useMemo(
		() => ({
			spellChecker: false,
			autofocus: true,
			placeholder: "Введите текст...",
			status: false,
			autosave: {
				uniqueId: String(new Date()),
				enabled: true,
				delay: 1000,
			},
		}),
		[]
	);

	useEffect(() => {
		if (id) {
			getOnePost(id).then((res) => {
				console.log(res);
				setText(res.text);
				setTitle(res.title);
				setTags(res.tags);
				setImageURL(res.imageUrl);
			});
		}
	}, [id]);

	const onChange = useCallback((value: string) => {
		setText(value);
	}, []);

	const handleChangeFile = async (event: any) => {
		try {
			const dataImage = new FormData();
			const file = event.target.files[0];
			dataImage.append("image", file);

			console.log(dataImage);
			const { data } = await axios.post(
				"http://localhost:4444/upload",
				dataImage,
				{
					headers: {
						authorization: window.localStorage.getItem("token"),
					},
				}
			);
			setImageURL(data.url);
		} catch (error) {
			console.warn(error);
			alert("Ошибка при загрузке файла");
		}
	};

	const onClickRemoveImage = () => {
		setImageURL("");
	};

	const onChangeTitle = (title: string) => {
		setTitle(title);
	};

	const handleChangeTags = (event: SelectChangeEvent<typeof tags>) => {
		const {
			target: { value },
		} = event;
		setTags(typeof value === "string" ? value.split(",") : value);
		console.log(tags);
	};

	const handleChangeTagInput = (event: string) => {
		setTagInput(event);
	};

	const addTag = (event: any) => {
		event.preventDefault();
		if (tagInput !== "") {
			setTagsData((prev) => (prev ? [...prev, tagInput] : [tagInput]));
			setTagInput("");
		}
	};

	const onSubmit = async () => {
		const idParam = id;
		try {
			const fields = {
				title: title,
				imageUrl: imageURL,
				tags: tags,
				text: text,
				user: ActiveUser._id,
			};

			console.log(fields);

			if (idParam) {
				await axios.patch(
					`http://localhost:4444/posts/${idParam}`,
					qs.stringify(fields),
					{
						headers: {
							authorization: window.localStorage.getItem("token"),
						},
					}
				);
				navigate(`/posts/${idParam}`);
			} else {
				const { data } = await axios.post(
					"http://localhost:4444/posts",
					qs.stringify(fields),
					{
						headers: {
							authorization: window.localStorage.getItem("token"),
						},
					}
				);
				const id = data._id;
				navigate(`/posts/${id}`);
			}
		} catch (error) {
			console.warn(error);
			alert("Ошибка при создании статьи");
		}
	};

	if (!isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<div>
			<Paper style={{ padding: 30 }}>
				<Button
					onClick={() => inputFileRef.current?.click()}
					variant="outlined"
					size="large"
				>
					Загрузить превью
				</Button>
				<input
					ref={inputFileRef}
					type="file"
					onChange={(e) => handleChangeFile(e)}
					hidden
				/>
				{imageURL && (
					<>
						<Button
							variant="contained"
							color="error"
							onClick={onClickRemoveImage}
						>
							Удалить
						</Button>
						<img
							className="image"
							src={`http://localhost:4444${imageURL}`}
							alt="Uploaded"
						/>
					</>
				)}
				<br />
				<br />
				<TextField
					className="title"
					variant="standard"
					placeholder="Заголовок статьи..."
					value={title}
					onChange={(e) => onChangeTitle(e.target.value)}
					fullWidth
				/>
				<div className="tags__block">
					<FormControl sx={{ width: "40%", marginRight: "10%" }}>
						<InputLabel>Tag</InputLabel>
						<Select
							multiple
							value={tags}
							onChange={handleChangeTags}
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => selected.join(", ")}
							MenuProps={MenuProps}
						>
							{tagsData?.map((name: string) => (
								<MenuItem key={name} value={name}>
									<Checkbox
										checked={tags.indexOf(name) > -1}
									/>
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<form onSubmit={addTag} className="tag_input">
						<TextField
							sx={{ width: "80%" }}
							className="tag_input"
							variant="outlined"
							placeholder="тег"
							value={tagInput}
							onChange={(e) =>
								handleChangeTagInput(e.target.value)
							}
							fullWidth
							required
						/>
						<Button
							sx={{ height: 55, width: "10%" }}
							type="submit"
							variant="outlined"
							size="large"
						>
							+
						</Button>
					</form>
				</div>

				<SimpleMdeReact
					className="editor"
					value={text}
					onChange={onChange}
					options={options}
				/>

				<div className="buttons">
					<Button onClick={onSubmit}>Опубликовать</Button>
					<Button size="large" onClick={() => navigate(-1)}>
						Отмена
					</Button>
				</div>
			</Paper>
		</div>
	);
}
