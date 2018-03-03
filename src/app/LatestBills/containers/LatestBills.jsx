import React from 'react'
import { connect } from 'react-redux'

import { Creators } from '../actions/actions';

import { toggleSegmentPaid } from '../services'

import {
  DeleteBtn,
  BillDate,
  BillPrice,
  BillSegment,
  BillTitle
} from '../../Common'

class LatestBills extends React.Component {
  render() {
    const { gettingBills, latestBills, flatmates, onBillDelete, onToggleSegmentPaid } = this.props

    const sortedBills = [].concat(latestBills).sort((a, b) => a.id < b.id)
  
    return (
      <ul className="latest-bills uk-list uk-list-large">
        {gettingBills &&
          <span className="latest-bills__spinner">💩</span>
        }

        {!gettingBills && latestBills && latestBills.length === 0 &&
          <p className="uk-text-center">No bills added yet 🤔</p>
        }

        {latestBills && sortedBills.map((bill) => {
          const segmentsIsPaid = bill.segments.filter(segment => segment.isPaid).length === bill.segments.length

          return (
            <li key={bill.id} className="uk-margin-top uk-margin-bottom">
              <BillTitle title={bill.name} />

              <BillDate
                dateDue={bill.dateDue}
                dateFrom={bill.dateFrom}
                dateTo={bill.dateTo}
                className="latest-bills__date"
              />
  
              <div className="uk-display-inline-block uk-h3 uk-align-right uk-margin-remove">
                {!segmentsIsPaid ?
                  <BillPrice
                    currentBalance={bill.segmentsCurrentBalance}
                    totalCost={bill.price}
                  />
                :
                  <span className="uk-h3 uk-margin-remove">Paid</span>
                }

                {/* &nbsp;
                <DeleteBtn
                  onDelete={() => onBillDelete(bill.id)}
                /> */}
              </div>

              <ul className="uk-list uk-padding-remove-left">
                {flatmates.length ? bill.segments.map(segment => {
                  const { firstName, lastName } = flatmates[segment.flatmateId]

                  const billIdx = latestBills.findIndex(item => item.id === bill.id)

                  return <BillSegment {...{
                    key: segment.flatmateId,
                    firstName,
                    lastName,
                    segment,
                    onToggleSegmentPaid: e => {
                      e.preventDefault()
                      onToggleSegmentPaid(latestBills, billIdx, segment.flatmateId)
                    }
                  }} />

                }) : null}
              </ul>

            </li>
          )
        })}
      </ul>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onBillDelete: (billId) => dispatch(Creators.deleteBill(billId)),
  onToggleSegmentPaid: (bills, billIdx, flatmateId) => dispatch(toggleSegmentPaid(bills, billIdx, flatmateId))
});

const mapStateToProps = (state, ownProps) => ({
  gettingBills: state.Bills.gettingBills,
  latestBills: state.Bills.latestBills,
  flatmates: state.Flatmates.flatmates
})

export {
  LatestBills
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestBills)