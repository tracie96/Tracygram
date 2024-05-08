const sampleMessages = [
  {
    title: "Aug 3, 2023",
    data: [
      {
        id: '1',
        text: 'Good morning, are you available today?',
        time: '08:45 am',
        type: 'received',
      },
      {
        id: '2',
        text: 'Morning! Yes, what time suits you?',
        time: '08:46 am',
        type: 'sent',
        seen: true,
      },
      // ... more messages for Aug 3
    ],
  },
  {
    title: "Aug 4, 2023",
    data: [
      {
        id: '13',
        text: 'Morning! Can we reschedule our today’s meeting?',
        time: '08:15 am',
        type: 'received',
      },
      // ... more messages for Aug 4
    ],
  },
  {
    title: "Aug 5, 2023",
    data: [
      {
        id: '19',
        text: 'Don’t forget to send me the report.',
        time: '03:30 pm',
        type: 'received',
      },
      {
        id: '20',
        text: 'Just sent it your way!',
        time: '03:45 pm',
        type: 'sent',
        seen: false,
      },
      // ... more messages for Aug 5
    ],
  },
  // ... more sections for additional days
];

export default sampleMessages;