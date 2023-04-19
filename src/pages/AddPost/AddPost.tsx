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

export function AddPost() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [text, setText] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [tags, setTags] = useState<string[]>([]);
	const isAuth = useAppSelector(isAuthUserSelector);
	const inputFileRef = useRef<HTMLInputElement | null>(null);
	const [imageURL, setImageURL] = useState<string>("");
	const Activeuser = useAppSelector(DataSelector);
	const [tagsData, setTagsData] = useState(useAppSelector(allTagsSelector));
	const [tagInput, setTagInput] = useState("");

	const onChange = useCallback((value: any) => {
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

	const onChangeTitle = (title: string) => {
		setTitle(title);
	};

	// const onChangeTags = (tags: string) => {
	// 	setTags(tags);
	// };

	const onSubmit = async () => {
		const idParam = id;
		try {
			const fields = {
				title: title,
				imageUrl: imageURL,
				tags: tags,
				text: text,
				user: Activeuser._id,
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

	const handleChange = (event: SelectChangeEvent<typeof tags>) => {
		const {
			target: { value },
		} = event;
		setTags(typeof value === "string" ? value.split(",") : value);
		console.log(tags);
	};

	const handleChangeTagInput = (event: string) => {
		setTagInput(event);
	};

	const addTag = () => {
		if (tagInput != "") {
			setTagsData((prev) => (prev ? [...prev, tagInput] : [tagInput]));
			setTagInput("");
		}
	};

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
					<FormControl sx={{ width: "30vw" }}>
						<InputLabel>Tag</InputLabel>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							value={tags}
							onChange={handleChange}
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => selected.join(", ")}
						>
							{tagsData?.map((name: any) => (
								<MenuItem key={name} value={name}>
									<Checkbox
										checked={tags.indexOf(name) > -1}
									/>
									<ListItemText primary={name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<form>
						<TextField
							sx={{ width: "30vw" }}
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
							sx={{ height: 55 }}
							type="submit"
							onClick={addTag}
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
					<Button size="large">Отмена</Button>
				</div>
			</Paper>
		</div>
	);
}
