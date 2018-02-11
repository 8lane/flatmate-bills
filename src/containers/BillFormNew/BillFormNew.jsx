import React from 'react'
import { connect } from 'react-redux'
import Immutable from 'seamless-immutable'

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker, DateRangePicker } from 'react-dates';

import { Creators } from './actions';
import { Creators as LatestBillsCreators } from '../../actions';

class NewBillForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focusedInput: null
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSaveNewBill(this.props.newBill)
    this.props.onClearNewBill()
  }

  handleContributor = (evt) => {
    const { newBill: { segments } } = this.props
    const flatmateId = parseInt(evt.target.value)
    let newSegments = []

    if (segments.length) {
      segments.forEach(segment => {
        if (segment.flatmateId === flatmateId) {
          newSegments = segments.filter(segment => segment.flatmateId !== flatmateId)
        } else {
          newSegments = [...segments, {
            flatmateId,
            daysOwed: null,
            price: null,
            isPaid: false
          }]
        }
      })
    } else {
      newSegments = [...segments, {
        flatmateId,
        daysOwed: null,
        price: null,
        isPaid: false
      }]
    }

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
      <div>
        
        <button onClick={() => onToggleVisibility(!isEditing) }>
          {!isEditing ? 'New Bill +' : 'x'}
        </button>

        {isEditing ?
          <form onSubmit={this.handleSubmit}>
            <p>
              <input
                placeholder="Bill Name"
                type="text"
                value={newBill.name}
                onChange={e => onChangeValue('name', e.target.value)}
              />
            </p>

            <p>
              <input
                placeholder="Bill Price"
                type="number"
                value={newBill.price}
                onChange={e => onChangeValue('price', e.target.value)}
              />
            </p>

            <p>
              <select
                placeholder="Bill Owner"
                type="text"
                value={newBill.flatmateOwner}
                onChange={e => onChangeValue('flatmateOwner', e.target.value)}
              >
                {Object.keys(flatmates).map(id =>
                  <option key={id} value={id}>{flatmates[id].firstName} {flatmates[id].lastName}</option>
                )}
              </select>
            </p>

            <DateRangePicker
              startDate={newBill.dateFrom}
              startDateId="your_unique_start_date_id"
              endDate={newBill.dateTo}
              endDateId="your_unique_end_date_id"
              focusedInput={this.state.focusedInput}
              onDatesChange={({ startDate, endDate }) => {
                onChangeValue('dateFrom', startDate)
                onChangeValue('dateTo', endDate)
              }}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
            />

            <div>
              <h4>Add bill contributors

                {newBill.segments.length > 1 &&
                  <label>
                    &nbsp;&ndash;
                    Equally split?
                    <input
                      type="checkbox"
                      checked={equalSegmentSplit}
                      onChange={e => onToggleEqualSplit()}
                    />
                  </label>
                }
              </h4>

              <br/><br/>

              {Object.keys(flatmates).map(id =>
                <label key={id}>
                  {flatmates[id].firstName} {flatmates[id].lastName}
                  <input ref={`contributor${id}`} type="checkbox" name="segments" value={id} onChange={this.handleContributor} />

                  {!equalSegmentSplit && this.refs[`contributor${id}`].checked ?
                    <input type="number" placeholder="Days owed" onChange={evt => onUpdateSegmentDaysOwed(evt.target.value, id)} />
                    : null
                  }
                  <br /><br />
                </label>
              )}
            </div>
      


            <p>
              Already paid? 
              <input
                type="checkbox"
                onChange={e => onChangeValue('archived', !newBill.archived)}
              />
            </p>

            {newBill && newBill.archived ?
              <SingleDatePicker
                date={newBill.datePaid}
                onDateChange={datePaid => onChangeValue('datePaid', datePaid)}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
              />
              : null
            }


            <button type="submit">Add bill +</button>
          </form>
          : null
        }
      </div>
      
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onToggleEqualSplit: () => dispatch(Creators.toggleEqualSegmentSplit()),
  onToggleVisibility: (editing) => dispatch(Creators.toggleNewFormVisibility(editing)),
  onChangeValue: (fieldKey, fieldValue) => dispatch(Creators.updateNewFormField(fieldKey, fieldValue)),
  onClearNewBill: () => dispatch(Creators.clearNewForm()),
  onSaveNewBill: (newBill) => dispatch(LatestBillsCreators.saveNewBill(newBill)),
  onUpdateSegmentDaysOwed: (fieldValue, flatmateId) => dispatch(Creators.updateSegmentDaysOwed(fieldValue, flatmateId))
})

const mapStateToProps = (state, ownProps) => ({
  flatmates: state.flatmates,
  newBill: state.BillFormNew.newBill,
  isEditing: state.BillFormNew.isEditing,
  equalSegmentSplit: state.BillFormNew.equalSegmentSplit
})

export default connect(mapStateToProps, mapDispatchToProps)(NewBillForm)