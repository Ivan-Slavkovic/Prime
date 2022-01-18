import { useEffect, useState } from 'react';
import { postRequest } from '../api';
import { Link } from 'react-router-dom';
const Temporary = () => {
	let [ message, setMessage ] = useState('');
	let [ responseStatus, setResponseStatus ] = useState(0);
	let [ state, setState ] = useState({
		name              : '',
		email             : '',
		phone             : '',
		location          : '',
		profilePic        : '',
		pricePerHour      : 0,
		technology        : '',
		description       : '',
		yearsOfExperience : '',
		nativeLanguage    : '',
		linkedin          : ''
	});

	let [ inputType ] = useState([
		'text',
		'email',
		'text',
		'text',
		'text',
		'number',
		'text',
		'text',
		'text',
		'text',
		'text'
	]);
	let [ nameState ] = useState([
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

	let [ technologies ] = useState([
		{ id: 1, name: 'JavaScript' },
		{ id: 2, name: 'Java' },
		{ id: 3, name: '.NET' },
		{ id: 4, name: 'Flutter' },
		{ id: 5, name: 'Python' },
		{ id: 6, name: 'PHP' }
	]);

	let [ errors, setErrors ] = useState({
		name              : [],
		email             : [],
		phone             : [],
		location          : [],
		pricePerHour      : [],
		technology        : [],
		yearsOfExperience : [],
		nativeLanguage    : [],
		description       : [],
		linkedin          : [],
		profilePic        : []
	});

	let [ dirty, setDirty ] = useState({
		name              : false,
		email             : false,
		phone             : false,
		location          : false,
		pricePerHour      : false,
		technology        : false,
		yearsOfExperience : false,
		nativeLanguage    : false,
		description       : false,
		linkedin          : false,
		profilePic        : false
	});

	let [ langugages ] = useState([
		{ id: 1, name: 'English' },
		{ id: 2, name: 'Serbian' },
		{ id: 3, name: 'Bulgarian' }
	]);

	//validation
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
		errorsData.description = [];
		errorsData.description.push('');

		errorsData.linkedin = [];
		errorsData.linkedin.push('');

		errorsData.profilePic = [];
		errorsData.profilePic.push('');

		setErrors(errorsData);
	};
	useEffect(validate, [ state ]);

	let onRegisterClick = async () => {
		let dirtyData = dirty;
		Object.keys(dirty).forEach((control) => {
			dirtyData[control] = true;
		});
		setDirty(dirtyData);
		validate();

		if (isValid()) {
			postRequest(state)
				.then((response) => {
					setResponseStatus(response.request.status);
				})
				.catch((e) => console.log(e));
		}
	};
	useEffect(
		() => {
			if (!responseStatus) return;
			if (responseStatus === 201) {
				setMessage(
					<span className="text-success">
						Successfully Registered
					</span>
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
							Add User
						</h4>
						<ul className="text-danger">
							{Object.keys(errors).map((control) => {
								if (dirty[control]) {
									return errors[control].map((err) => {
										return <li key={err}>{err}</li>;
									});
								} else {
									return '';
								}
							})}
						</ul>
					</div>
					{Object.keys(state).map((result, index) => {
						if (
							result == 'technology' ||
							result == 'nativeLanguage'
						) {
							return (
								<div className="card-body border-bottom">
									{/* name starts */}
									<div className="form-group form-row">
										<label
											className="col-lg-4"
											htmlFor={result}>
											{nameState[index]}
										</label>
										<div className="col-lg-8">
											<select
												className="form-control"
												name={result}
												id={result}
												value={state.result}
												onChange={(event) => {
													setState({
														...state,
														[event.target.name]:
															event.target.value
													});
												}}
												onBlur={(event) => {
													setDirty({
														...dirty,
														[event.target
															.name]: true
													});
													validate();
												}}>
												<option value="">
													Please select one
												</option>
												{result == 'technology' ? (
													technologies.map((tech) => (
														<option
															key={tech.id}
															value={tech.id}>
															{tech.name}
														</option>
													))
												) : (
													langugages.map((lang) => (
														<option
															key={lang.id}
															value={lang.id}>
															{lang.name}
														</option>
													))
												)}
											</select>

											<div className="text-danger">
												{dirty[`${result}`] &&
												errors[`${result}`][0] ? (
													errors[`${result}`]
												) : (
													''
												)}
											</div>
										</div>
									</div>
									{/* name ends */}

									{/* footer starts */}
								</div>
							);
						}
						return (
							<div className="card-body border-bottom">
								{/* name starts */}
								<div className="form-group form-row">
									<label
										className="col-lg-4"
										htmlFor={result}>
										{nameState[index]}
									</label>
									<div className="col-lg-8">
										<input
											type={inputType[index]}
											className="form-control"
											name={result}
											id={result}
											value={state.result}
											onChange={(event) => {
												setState({
													...state,
													[event.target.name]:
														event.target.value
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

										<div className="text-danger">
											{dirty[`${result}`] &&
											errors[`${result}`][0] ? (
												errors[`${result}`]
											) : (
												''
											)}
										</div>
									</div>
								</div>
								{/* name ends */}

								{/* footer starts */}
							</div>
						);
					})}
					<div className="card-footer text-center">
						<div className="m-1">{message}</div>
						<div>
							<Link
								to="/"
								className="btn btn-primary m-2"
								onClick={onRegisterClick}>
								Register
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Temporary;
