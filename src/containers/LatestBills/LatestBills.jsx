import React from 'react'
import { connect } from 'react-redux'

import { Creators } from './actions/actions';

import { DeleteBtn, BillDate, BillPrice, BillSegment, BillTitle } from '../../components'

const LatestBills = ({ latestBills, flatmates, onBillDelete, onToggleSegmentPaid }) => {
  return (
    <ul className="latest-bills uk-list uk-list-large">
      {latestBills && latestBills.map((bill) => {
        return (
          <li key={bill.id} className="uk-margin-top uk-margin-bottom">
            <BillTitle title={bill.name} />

            <BillDate dateFrom={bill.dateFrom} dateTo={bill.dateTo} className="latest-bills__date" />
 
            <div className="uk-display-inline-block uk-h3 uk-align-right uk-margin-remove">
              {!bill.segmentsIsPaid ?
                <div>
                  <BillPrice
                    className=""
                    total={bill.segmentsCurrentBalance}
                  />
                  &nbsp;/&nbsp;
                  <BillPrice
                    className=""
                    total={bill.price}
                  />
                </div>
              :
                <span className="uk-h3 uk-margin-remove">Paid</span>
              }

              {/* &nbsp;
              <DeleteBtn
                onDelete={() => onBillDelete(bill.id)}
              /> */}
            </div>

            <ul className="uk-list uk-padding-remove-left">
              {bill.segments.map(segment => {
                const { firstName, lastName } = flatmates[segment.flatmateId]

                return <BillSegment {...{
                  key: segment.flatmateId,
                  firstName,
                  lastName,
                  segment,
                  onToggleSegmentPaid: e => {
                    e.preventDefault()
                    onToggleSegmentPaid(bill.id, segment.flatmateId)
                  }
                }} />

              })}
            </ul>

          </li>
        )
      })}
    </ul>
  )
}

const mapDispatchToProps = dispatch => ({
  onBillDelete: (billId) => dispatch(Creators.deleteBill(billId)),
  onToggleSegmentPaid: (billId, flatmateId) => dispatch(Creators.toggleSegmentPaid(billId, flatmateId))
});

const mapStateToProps = (state, ownProps) => ({
  latestBills: state.Bills.latestBills,
  flatmates: state.flatmates
})

export default connect(mapStateToProps, mapDispatchToProps)(LatestBills)