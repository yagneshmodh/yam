import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import PersonalInfoForm from '../../components/PersonalInfoForm';

import { getPersonalInfo, makePersonalInfoLoading, makePersonalInfoError } from './../../selectors/personalInfoSelector';
import * as personalInfoAction from './../../actions/personalInfoAction';

class PersonalInfo extends Component {
	constructor(props) {
		super(props);
		this.submitPersonalInfo = this.submitPersonalInfo.bind(this);
	}

	submitPersonalInfo(values) {
		const fd = new FormData();
		Object.keys(values.toJS()).forEach(key => fd.append(key, values.get(key)));
		this.props.personalInfoAction.personalInfoSave(fd);
	}
	render() {
		return (
			<div>
				<PersonalInfoForm onSubmit={this.submitPersonalInfo} loading={this.props.loading} />
			</div>
		);
	}
}

PersonalInfo.propTypes = {
	loading: PropTypes.bool.isRequired,
	personalInfoAction: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
	return {
		personalInfoAction: bindActionCreators(personalInfoAction, dispatch),
	};
}

const mapStateToProps = createStructuredSelector({
	personalInfo: getPersonalInfo(),
	loading: makePersonalInfoLoading(),
	error: makePersonalInfoError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);