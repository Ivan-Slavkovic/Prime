import { useEffect, useState } from 'react';
import { deleteRequest, getRequest, updateUser } from '../api';
import { Link } from 'react-router-dom';
import './ListOfUsers.css';

const ListOfUsers = (props) => {
	const [ hireId, setHireId ] = useState(-1);

	const [ data, setData ] = useState([]);
	const [ listOfHeaders ] = useState([
		'Name',
		'E-mail',
		'Phone number',
		'Location',
		'Profile picture(URL)',
		'Price per hour',
		'Technology',
		'Description',
		'Years of Experience',
		'Native language',
		'Linkedin'
	]);
	const [ date, setDate ] = useState({
		startDate : '',
		endDate   : '',
		isHired   : true
	});

	useEffect(() => {
		document.title = 'List of users';
		getRequest()
			.then((result) => {
				setData(result.data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const onDeleteClick = (userId) => {
		let id = userId.target.value;
		if (window.confirm('Do you want to delete this user?')) {
			deleteRequest(id);
			const newUserList = data.filter((user) => {
				return user.id !== id;
			});
			setData(newUserList);
		}
	};

	const onAddClick = (event) => {
		setMessage('');
		var whichOne = event.target.id;
		setHireId(whichOne);
		var modal = document.getElementById('myModal');
		var btn = document.getElementById(whichOne);
		var span = document.getElementsByClassName('close')[0];
		btn.onclick = () => {
			modal.style.display = 'block';
		};
		span.onclick = () => {
			modal.style.display = 'none';
		};
		window.onclick = (event) => {
			if (event.target == modal) {
				modal.style.display = 'none';
			}
		};
	};
	let [ message, setMessage ] = useState('');
	const onHireHandler = () => {
		let fiteredUser = data.filter((value) => value.id == hireId);
		let x = Object.keys(fiteredUser);
		if (fiteredUser[x].isHired) {
			setMessage('User is already hired');
			return;
		}

		fiteredUser = { ...fiteredUser[x], ...date };

		updateUser(hireId, fiteredUser);
	};
	return (
		<div>
			<div className="m-2 text-center">
				<Link to="/adduser" className="btn btn-primary btn-lg">
					ADD USER
				</Link>
			</div>
			<div className="col-lg-10 mx-auto mb-2">
				<div className="card my-2 shadow">
					<div className="card-body">
						<table className="table">
							<thead>
								<tr>
									{listOfHeaders.map((result, index) => {
										return <th key={index}>{result}</th>;
									})}
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{!data ? (
									''
								) : (
									data.map((user) => {
										return (
											<tr key={user.id}>
												<td>{user.name}</td>
												<td>{user.email}</td>
												<td>{user.phone}</td>
												<td>{user.location}</td>
												<td>
													<img
														src={
															user.profilePic ? (
																user.profilePic
															) : (
																''
															)
														}
													/>
												</td>
												<td>{user.pricePerHour}$</td>
												<td>{user.technology}</td>
												<td className="userDescription">
													{user.description ? (
														user.description
													) : (
														''
													)}
												</td>
												<td>
													{user.yearsOfExperience}
												</td>
												<td>{user.nativeLanguage}</td>
												<td>
													{user.linkedin ? (
														<a href={user.linkedin}>
															Linkedin
														</a>
													) : (
														''
													)}
												</td>
												<td className="d-grid gap-3">
													<button
														type="button"
														value={user.id}
														className="btn btn-danger "
														onClick={onDeleteClick}>
														DELETE
													</button>
													<button
														type="button"
														className="btn btn-success myBtn "
														id={user.id}
														onClick={onAddClick}>
														HIRE
													</button>

													<Link
														className="btn btn-info"
														to={{
															pathname : `/edituser/${user.id}`
														}}>
														EDIT
													</Link>
												</td>
											</tr>
										);
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
				<div id="myModal" className="modal">
					<div className="modal-content">
						<span className="close">&times;</span>
						<label>Starting from</label>
						<input
							type="date"
							name="startDate"
							value={date.startDate}
							onChange={(event) => {
								setDate({
									...date,
									[event.target.name]: event.target.value
								});
							}}
						/>
						<label>Hiring to</label>
						<input
							type="date"
							value={date.endDate}
							name="endDate"
							onChange={(event) => {
								setDate({
									...date,
									[event.target.name]: event.target.value
								});
							}}
						/>
						{message ? (
							<div className="text-danger text-center">
								{message}
							</div>
						) : (
							''
						)}
						<button
							className="btn btn-primary mt-4"
							onClick={onHireHandler}>
							Procced
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListOfUsers;
