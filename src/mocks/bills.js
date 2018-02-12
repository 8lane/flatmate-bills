export default [
  {
    id: 0,
    name: 'Internet',
    flatmateOwner: 0,
    price: 42,
    dateFrom: '22/01/18',
    dateTo: '23/02/18',
    datePaid: null,
    archived: false,
    numberOfSplitSegments: 0,
    segmentsIsPaid: false,
    segmentsCurrentBalance: 0,
    segments: [
      {
        flatmateId: 0,
        daysOwed: 33,
        price: 10.50,
        isPaid: false
      },
      {
        flatmateId: 2,
        daysOwed: 33,
        price: 10.50,
        isPaid: false
      },
      {
        flatmateId: 3,
        daysOwed: 33,
        price: 10.50,
        isPaid: false
      },
      {
        flatmateId: 4,
        daysOwed: 33,
        price: 10.50,
        isPaid: false
      }
    ],
  },
  {
    id: 1,
    name: 'Council Tax',
    flatmateOwner: 3,
    price: 110,
    dateFrom: '22/01/18',
    dateTo: '23/02/18',
    datePaid: null,
    archived: false,
    numberOfSplitSegments: 0,
    segmentsIsPaid: false,
    segmentsCurrentBalance: 36.66666666666667,
    segments: [
      {
        flatmateId: 0,
        daysOwed: 33,
        price: 36.66666666666667,
        isPaid: false
      },
      {
        flatmateId: 2,
        daysOwed: 33,
        price: 36.66666666666667,
        isPaid: false
      },
      {
        flatmateId: 3,
        daysOwed: 33,
        price: 36.66666666666667,
        isPaid: true
      }
    ],
  },
  {
    id: 2,
    name: 'Water',
    flatmateOwner: 0,
    price: 147.84,
    dateFrom: '22/01/18',
    dateTo: '31/03/18',
    datePaid: null,
    archived: false,
    numberOfSplitSegments: 1,
    segmentsIsPaid: false,
    segmentsCurrentBalance: 0,
    segments: [
      {
        flatmateId: 0,
        daysOwed: 69,
        price: 36.96,
        isPaid: false
      },
      {
        flatmateId: 2,
        daysOwed: 69,
        price: 36.96,
        isPaid: false
      },
      {
        flatmateId: 3,
        daysOwed: 69,
        price: 36.96,
        isPaid: false
      },
      {
        flatmateId: 4,
        daysOwed: 17,
        price: 9.11,
        isPaid: false
      },
      {
        flatmateId: 1,
        daysOwed: 52,
        price: 27.85,
        isPaid: false
      }
    ]
  }
]