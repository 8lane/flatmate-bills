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
    const { latestBills, flatmates, onBillDelete, onToggleSegmentPaid } = this.props

    const sortedBills = [].concat(latestBills).sort((a, b) => a.id < b.id)

    return (
      <ul className="latest-bills uk-list uk-list-large">
        {latestBills && sortedBills.map((bill) => {
          return (
            <li key={bill.id} className="uk-margin-top uk-margin-bottom">
              <BillTitle title={bill.name} />

              <BillDate dateFrom={bill.dateFrom} dateTo={bill.dateTo} className="latest-bills__date" />
  
              <div className="uk-display-inline-block uk-h3 uk-align-right uk-margin-remove">
                {!bill.segmentsIsPaid ?
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

                  return <BillSegment {...{
                    key: segment.flatmateId,
                    firstName,
                    lastName,
                    segment,
                    onToggleSegmentPaid: e => {
                      e.preventDefault()
                      onToggleSegmentPaid(bill.id, segment.flatmateId, latestBills)
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
  onToggleSegmentPaid: (billId, flatmateId, latestBills) => dispatch(toggleSegmentPaid(billId, flatmateId, latestBills))
});

const mapStateToProps = (state, ownProps) => ({
  latestBills: state.Bills.latestBills,
  flatmates: state.Flatmates.flatmates
})

export default connect(mapStateToProps, mapDispatchToProps)(LatestBills)