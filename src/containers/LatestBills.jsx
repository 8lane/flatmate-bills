import React from 'react'
import { connect } from 'react-redux'

import { Creators } from '../actions';

import { DeleteBtn, BillPrice, BillSegment, BillTitle } from '../components'

const LatestBills = ({ latestBills, flatmates, onBillDelete, onToggleSegmentPaid }) => {
  return (
    <ul>
      {latestBills && latestBills.map((bill) => {
        return (
          <li key={bill.id}>
            <BillTitle title={bill.name} />

            <h3>
              Total:
              <BillPrice total={bill.price} />
              &nbsp;
              Transferred:
              <BillPrice total={!bill.segmentsIsPaid ? bill.segmentsCurrentBalance : bill.price} />
              &nbsp;
              <DeleteBtn onDelete={() => onBillDelete(bill.id)} />
            </h3>

            <ul>
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
  latestBills: state.bills.latestBills,
  flatmates: state.flatmates
})

export default connect(mapStateToProps, mapDispatchToProps)(LatestBills)