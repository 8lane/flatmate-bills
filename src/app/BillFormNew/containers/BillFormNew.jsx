import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker } from 'react-dates';

import { createBill } from '../../Core/services/firebaseService'
 
import { Creators } from '../../BillFormNew/actions/actions';
import { Creators as LatestBillsCreators } from '../../LatestBills/actions/actions';

class NewBillForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focusedDateDue: false
    }
  }

  componentDidMount() {
    this.props.onChangeValue('id', this.props.latestBills.length)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSaveNewBill(this.props.newBill)
  }

  handleContributor = (evt) => {
    const { segments } = this.props.newBill
    const flatmateId = parseInt(evt.target.value)
    
    let newSegments = [
      ...segments,
      {
        flatmateId,
        daysOwed: null,
        price: null,
        isPaid: false
      }
    ]

    segments.length && segments.forEach(segment => {
      if (segment.flatmateId === flatmateId) {
        newSegments = segments.filter(segment => segment.flatmateId !== flatmateId)
      }
    })

    this.props.onChangeValue('segments', newSegments)
  }

  render() {
    const {
      flatmates,
      newBill,
      isEditing,
      equalSegmentSplit,
      onToggleEqualSplit,
      onToggleVisibility,
      onChangeValue,
      onUpdateSegmentDaysOwed
    } = this.props
    
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="uk-fieldset uk-margin">
          <h4>What kind of bill is it?</h4>
          <input
            required
            className="uk-input uk-form-large"
            placeholder="e.g. Council Tax"
            type="text"
            value={newBill.name}
            onChange={e => onChangeValue('name', e.target.value)}
          />
        </fieldset>

        <fieldset className="uk-fieldset uk-margin">
          <h4>How much does it cost?</h4>
          <input
            required
            className="uk-input uk-form-large"
            placeholder="e.g. £65.12"
            type="number"
            value={newBill.price}
            onChange={e => onChangeValue('price', e.target.value)}
          />
        </fieldset>

        <fieldset className="uk-fieldset uk-margin">
          <h4>When is it due?</h4>
          <SingleDatePicker
            block
            placeholder="Select a date..."
            date={newBill.dateDue ? moment(newBill.dateDue) : null}
            focused={this.state.focusedDateDue}
            onDateChange={(date) => onChangeValue('dateDue', date.format())}
            onFocusChange={() => this.setState({ focusedDateDue: !this.state.focusedDateDue })}
            isOutsideRange={() => false}
            numberOfMonths={1}
            displayFormat="Do MMMM YYYY"
          />
        </fieldset>

        <fieldset className="uk-fieldset uk-margin">
          <h4>Which flatmate is managing it?</h4>
          <select
            required
            className="uk-select uk-form-large"
            placeholder="e.g. Antonio Conte"
            type="text"
            value={newBill.flatmateOwner}
            onChange={e => onChangeValue('flatmateOwner', e.target.value)}
          >
            <option value="" disabled>Choose a flatmate</option>
            {flatmates.map(({ id, firstName, lastName }) =>
              <option key={id} value={id}>{firstName} {lastName}</option>
            )}
          </select>
        </fieldset>

        {/* <fieldset className="uk-fieldset uk-margin"> */}
          {/* <h4>Is it equally split?</h4> */}
          {/* <label>
            Yes&nbsp;
            <input
              className="uk-checkbox"
              type="radio"
              name="equalSegmentSplit"
              checked={equalSegmentSplit}
              onChange={e => onToggleEqualSplit()}
            />
          </label> */}
          {/* &nbsp;&nbsp; */}
          {/* <label>
            No&nbsp;
            <input
              className="uk-checkbox"
              type="radio"
              name="equalSegmentSplit"
              checked={!equalSegmentSplit}
              onChange={e => onToggleEqualSplit()}
            />
          </label> */}
        {/* </fieldset> */}

        {/* {!equalSegmentSplit &&
          <fieldset className="uk-fieldset uk-margin">
            <h4>What period does the bill cover?</h4>
            <DateRangePicker
              block={true}
              isOutsideRange={() => false}
              startDate={newBill.dateFrom ? moment(newBill.dateFrom) : null}
              startDateId="your_unique_start_date_id"
              endDate={newBill.dateTo ? moment(newBill.dateTo) : null}
              endDateId="your_unique_end_date_id"
              focusedInput={this.state.focusedInput}
              onDatesChange={({ startDate, endDate }) => {
                startDate && onChangeValue('dateFrom', startDate.format())
                endDate && onChangeValue('dateTo', endDate.format())
              }}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
              displayFormat="DD-MM-YYYY"
            />
          </fieldset>
        } */}
        
        <fieldset className="uk-fieldset uk-margin">
          <h4>Who's contributing to it?</h4>

          <fieldset className="uk-fieldset uk-margin">
            {flatmates.map(({ id, firstName, lastName }) =>
              <label key={id} className="uk-display-block uk-margin-bottom">        
                <input
                  ref={`contributor${id}`}
                  className="uk-checkbox"
                  type="checkbox"
                  name="segments"
                  value={id}
                  onChange={this.handleContributor}
                />

                <span>&nbsp;{firstName} {lastName}</span>

                {/* {!equalSegmentSplit && this.refs[`contributor${id}`].checked ?
                  <input
                    className="uk-input uk-form-large uk-margin-top"
                    type="number"
                    placeholder="Days owed"
                    onChange={evt => onUpdateSegmentDaysOwed(evt.target.value, id)}
                  />
                  : null
                } */}
              </label>
            )}
          </fieldset>
        </fieldset>

        <button
          className="uk-button uk-button-primary uk-button-large"
          type="submit"
        >
          Save new bill
        </button>

        <button
          className="uk-button uk-button-default uk-button-large uk-margin-left"
          type="submit"
          onClick={() => onToggleVisibility(!isEditing)}
        >
          Discard
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onToggleEqualSplit: () => dispatch(Creators.toggleEqualSegmentSplit()),
  onToggleVisibility: (editing) => dispatch(Creators.toggleNewFormVisibility(editing)),
  onChangeValue: (fieldKey, fieldValue) => dispatch(Creators.updateNewFormField(fieldKey, fieldValue)),
  onSaveNewBill: (newBill) => dispatch(createBill(newBill)),
  onUpdateSegmentDaysOwed: (fieldValue, flatmateId) => dispatch(Creators.updateSegmentDaysOwed(fieldValue, flatmateId))
})

const mapStateToProps = (state, ownProps) => ({
  flatmates: state.Flatmates.flatmates,
  latestBills: state.Bills.latestBills,
  newBill: state.BillFormNew.newBill,
  isEditing: state.BillFormNew.isEditing,
  equalSegmentSplit: state.BillFormNew.equalSegmentSplit
})

export default connect(mapStateToProps, mapDispatchToProps)(NewBillForm)