import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getOneUser, updateUser } from '../api';
import { validate } from './AddUser';

const EditUser = (props) => {
	var { ID } = useParams();
	const [ state, setState ] = useState({});
	const getUser = () => {
		getOneUser(ID)
			.then((result) => {
				setState(result.data);
			})
			.catch((e) => console.log(e));
	};
	useEffect(() => {
		getUser();
	}, []);

	let [ langugages ] = useState([
		{ id: 1, name: 'English' },
		{ id: 2, name: 'Serbian' },
		{ id: 3, name: 'Bulgarian' }
	]);

	let [ technologies ] = useState([
		{ id: 1, name: 'JavaScript' },
		{ id: 2, name: 'Java' },
		{ id: 3, name: '.NET' },
		{ id: 4, name: 'Flutter' },
		{ id: 5, name: 'Python' },
		{ id: 6, name: 'PHP' }
	]);
	let [ message, setMessage ] = useState('');
	let [ responseStatus, setResponseStatus ] = useState(0);

	let [ errors, setErrors ] = useState({
		name              : [],
		email             : [],
		phone             : [],
		location          : [],
		pricePerHour      : [],
		technology        : [],
		yearsOfExperience : [],
		nativeLanguage    : []
	});
	let [ dirty, setDirty ] = useState({
		name              : false,
		email             : false,
		phone             : false,
		location          : false,
		pricePerHour      : false,
		technology        : false,
		yearsOfExperience : false,
		nativeLanguage    : false
	});
	let validate = () => {
		let errorsData = {};

		//for name
		errorsData.name = [];
		if (!state.name) {
			errorsData.name.push('Name cannot be blank');
		}

		//for email
		errorsData.email = [];
		if (!state.email) {
			errorsData.email.push('Email cannot be blank.');
		}

		//regex for email
		const validEmailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		if (state.email) {
			if (!validEmailRegex.test(state.email)) {
				errorsData.email.push('Proper email address is expected');
			}
		}

		//for phone
		errorsData.phone = [];
		if (!state.phone) {
			errorsData.phone.push('Phone number cannot be blank');
		}
		if (state.phone.length <= 9) {
			errorsData.phone.push(
				'Phone number needs to have atleast 10 digits'
			);
		}
		//location
		errorsData.location = [];
		if (!state.location) {
			errorsData.location.push('Location cannot be blank');
		}
		//for pricePerHour
		errorsData.pricePerHour = [];
		if (!state.pricePerHour) {
			errorsData.pricePerHour.push('Please enter your price per hour');
		}
		//for technology
		errorsData.technology = [];
		if (!state.technology) {
			errorsData.technology.push('Please select one of the technologies');
		}
		//for years of experience
		errorsData.yearsOfExperience = [];
		if (!state.yearsOfExperience) {
			errorsData.yearsOfExperience.push(
				'Please enter your years  of experience'
			);
		}
		//for native language
		errorsData.nativeLanguage = [];
		if (!state.nativeLanguage) {
			errorsData.nativeLanguage.push(
				'Please select your native language'
			);
		}
		setErrors(errorsData);
	};

	useEffect(
		() => {
			if (!responseStatus) return;
			if (responseStatus === 200) {
				setMessage(
					<span className="text-success">Successfully updated</span>
				);
			} else {
				setMessage(
					<span className="text-danger">
						Errors in database connection
					</span>
				);
			}
		},
		[ responseStatus ]
	);
	const onUpdateHandler = () => {
		let dirtyData = dirty;
		Object.keys(dirty).forEach((control) => {
			dirtyData[control] = true;
		});
		setDirty(dirtyData);

		validate();
		if (isValid()) {
			updateUser(ID, state)
				.then((respose) => {
					console.log(respose.request.status);
					setResponseStatus(respose.request.status);
				})
				.catch((e) => console.log(e));
		}
	};
	let isValid = () => {
		let valid = true;
		for (let control in errors) {
			if (errors[control].length > 1) {
				valid = false;
			}
		}
		return valid;
	};

	return (
		<div className="row">
			<div className="col-lg-6 col-md-7 mx-auto">
				<div className="card border-primary shadow my-2">
					<div className="card-header border-bottom border-primary">
						<h4
							style={{ fontSize: '40px' }}
							className="text-primary text-center">
							Edit User
						</h4>
					</div>
					<div className="card-body border-bottom">
						{/* Start name */}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="name">
								Name
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="name"
								id="name"
								value={state.name}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End name*/}

						{/* Start email*/}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="email">
								Email
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="email"
								className="form-control"
								name="email"
								id="email"
								value={state.email}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End email*/}

						{/* Start phone*/}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="phone">
								Phone number
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="phone"
								id="phone"
								value={state.phone}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End phone*/}
						{/* Start location*/}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="location">
								Location
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="location"
								id="location"
								value={state.location}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End location*/}

						{/* Start profilePic*/}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="profilePic">
								Profile picture (URL)
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="profilePic"
								id="profilePic"
								value={state.profilePic}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End profilePic*/}
						{/* Start pricePerHour*/}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="pricePerHour">
								Price per hour
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="number"
								className="form-control"
								name="pricePerHour"
								id="pricePerHour"
								value={state.pricePerHour}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End pricePerHour*/}
						{/* Start select */}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="technology">
								Technology
							</label>
						</div>
						<div className="col-lg-12">
							<select
								className="form-control"
								name="technology"
								id="technology"
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}>
								<option value="">{state.technology}</option>
								{technologies.map((tech) => (
									<option key={tech.id} value={tech.id}>
										{tech.name}
									</option>
								))}
							</select>
						</div>
						{/* End select */}

						{/* Start */}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="description">
								Description
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="description"
								id="description"
								value={state.description}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End */}

						{/* Start */}
						<div className="form-group form-now">
							<label
								className="col-lg-4"
								htmlFor="yearsOfExperience">
								Years of experience
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="yearsOfExperience"
								id="yearsOfExperience"
								value={state.yearsOfExperience}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End */}

						{/* Start select*/}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="language">
								Native language
							</label>
						</div>
						<div className="col-lg-12">
							<select
								className="form-control"
								name="language"
								id="language"
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}>
								<option value="">{state.language}</option>
								{langugages.map((lang) => (
									<option key={lang.id} value={lang.id}>
										{lang.name}
									</option>
								))}
							</select>
						</div>
						{/* End select*/}

						{/* Start */}
						<div className="form-group form-now">
							<label className="col-lg-4" htmlFor="linkedin">
								Linkedin
							</label>
						</div>
						<div className="col-lg-12">
							<input
								type="text"
								className="form-control"
								name="linkedin"
								id="linkedin"
								value={state.linkedin}
								onChange={(event) => {
									setState({
										...state,
										[event.target.name]: event.target.value
									});
								}}
								onBlur={(event) => {
									setDirty({
										...dirty,
										[event.target.name]: true
									});
									validate();
								}}
							/>
						</div>
						{/* End */}
						<div className="card-footer text-center">
							<div className="m-1">{message}</div>

							<div>
								<button
									className="btn btn-primary m-2"
									onClick={onUpdateHandler}>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditUser;
