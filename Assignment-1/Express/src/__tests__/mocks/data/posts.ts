import type { Post, SimplePost, PostDetail } from '../../../Typings/Post';

export const postIndexData: Post[] = [
  {
    'postID': '8cf0f459-c9ce-45d0-8e41-5d8091f81308',
    'user': 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    'date': '20-03-2023',
    'title': 'Dealing with Flight Anxiety',
    'content': 'I\'ve been struggling with flight anxiety,' +
        'and I need some advice on how to cope with it. What strategies have worked for you?',
    'categories': [
      'Anxiety Management',
      'Air Travel Worries',
    ],
    'likes': 8,
    'dislikes': 3,
  },
  {
    'postID': 'd2a53a53-5f50-4e8b-bcff-73753bbc4c91',
    'user': 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    'date': '15-05-2023',
    'title': 'Overcoming Flight Jitters',
    'content': 'Flying has always made me nervous, but I\'m ' +
        'determined to conquer my fear. Share your tips and experiences in managing flight anxiety.',
    'categories': [
      'Fear of Flying',
      'Coping Strategies',
    ],
    'likes': 11,
    'dislikes': 4,
  },
  {
    'postID': '7a1d6b14-7fc4-4cc6-8b1f-194c78583f36',
    'user': 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    'date': '10-07-2023',
    'title': 'Tips for a Stress-Free Flight',
    'content': 'Let\'s discuss how to make air travel less ' +
        'stressful for those with flight anxiety. Share your advice and stories!',
    'categories': [
      'Travel Anxiety',
      'Stress Reduction',
    ],
    'likes': 6,
    'dislikes': 2,
  },
  {
    'postID': 'c64ea67f-5bc9-4929-8102-158d6b96ffeb',
    'user': 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    'date': '02-08-2023',
    'title': 'Conquering My Fear of Flying',
    'content': 'I used to be terrified of flying, but I\'ve made significant ' +
        'progress in overcoming my fear. Let\'s share our success stories and support each other.',
    'categories': [
      'Success Stories',
      'Anxiety Victory',
    ],
    'likes': 9,
    'dislikes': 1,
  },
  {
    'postID': 'b8f1daaa-0655-4527-a90d-7a52a499de24',
    'user': 'a913eae9-0dd5-4a3e-8b5e-e72ba158bedf',
    'date': '19-09-2023',
    'title': 'Managing Flight Anxiety',
    'content': 'Flight anxiety can be overwhelming, but with the right ' +
        'strategies, it\'s manageable. Let\'s discuss what works for you.',
    'categories': [
      'Coping Methods',
      'Anxiety Relief',
    ],
    'likes': 7,
    'dislikes': 5,
  },
];

export const simplePostIndexData: SimplePost[] = [
  {
    'postID': '8cf0f459-c9ce-45d0-8e41-5d8091f81308',
    'date': '20-03-2023',
    'title': 'Dealing with Flight Anxiety',
    'content': 'I\'ve been struggling with flight anxiety,' +
      'and I need some advice on how to cope with it. What strategies have worked for you?',
    'categories': [
      'Anxiety Management',
      'Air Travel Worries',
    ],
    'likes': 8,
    'dislikes': 3,
    'commentCount': 3,
  },
  {
    'postID': 'd2a53a53-5f50-4e8b-bcff-73753bbc4c91',
    'date': '15-05-2023',
    'title': 'Overcoming Flight Jitters',
    'content': 'Flying has always made me nervous, but I\'m ' +
      'determined to conquer my fear. Share your tips and experiences in managing flight anxiety.',
    'categories': [
      'Fear of Flying',
      'Coping Strategies',
    ],
    'likes': 11,
    'dislikes': 4,
    'commentCount': 2,
  },
  {
    'postID': '7a1d6b14-7fc4-4cc6-8b1f-194c78583f36',
    'date': '10-07-2023',
    'title': 'Tips for a Stress-Free Flight',
    'content': 'Let\'s discuss how to make air travel less ' +
      'stressful for those with flight anxiety. Share your advice and stories!',
    'categories': [
      'Travel Anxiety',
      'Stress Reduction',
    ],
    'likes': 6,
    'dislikes': 2,
    'commentCount': 2,
  },
  {
    'postID': 'c64ea67f-5bc9-4929-8102-158d6b96ffeb',
    'date': '02-08-2023',
    'title': 'Conquering My Fear of Flying',
    'content': 'I used to be terrified of flying, but I\'ve made significant ' +
      'progress in overcoming my fear. Let\'s share our success stories and support each other.',
    'categories': [
      'Success Stories',
      'Anxiety Victory',
    ],
    'likes': 9,
    'dislikes': 1,
    'commentCount': 2,
  },
  {
    'postID': 'b8f1daaa-0655-4527-a90d-7a52a499de24',
    'date': '19-09-2023',
    'title': 'Managing Flight Anxiety',
    'content': 'Flight anxiety can be overwhelming, but with the right ' +
      'strategies, it\'s manageable. Let\'s discuss what works for you.',
    'categories': [
      'Coping Methods',
      'Anxiety Relief',
    ],
    'likes': 7,
    'dislikes': 5,
    'commentCount': 0,
  },
];

export const postDetailIndex: PostDetail[] = [
  {
    'postID': '8cf0f459-c9ce-45d0-8e41-5d8091f81308',
    'user': 'Gardif',
    'date': '20-03-2023',
    'title': 'Dealing with Flight Anxiety',
    'content': 'I\'ve been struggling with flight anxiety,' +
        'and I need some advice on how to cope with it. What strategies have worked for you?',
    'categories': [
      'Anxiety Management',
      'Air Travel Worries',
    ],
    'likes': 8,
    'dislikes': 3,
    'comments': [
      {
        'commentID': 'abcdefabcdefabcdefabcdef0001',
        'content': 'I get so nervous before every flight.It\'s the takeoff that really gets to me.',
        'date': '01-01-2000',
        'post': '8cf0f459-c9ce-45d0-8e41-5d8091f81308',
        'user': 'zmaji',
      },
      {
        'commentID': 'abcdefabcdefabcdefabcdef0005',
        'content': 'Flying makes my heart race, and I can\'t help but think about all the things that could go wrong.',
        'date': '01-01-2000',
        'post': '8cf0f459-c9ce-45d0-8e41-5d8091f81308',
        'user': 'zmaji',
      },
      {
        'commentID': 'abcdefabcdefabcdefabcdef0009',
        'content': 'I always have to grip the armrest during turbulence. It\'s a nightmare for me.',
        'date': '01-01-2000',
        'post': '8cf0f459-c9ce-45d0-8e41-5d8091f81308',
        'user': 'zmaji',
      },
    ],
  },
  {
    'postID': 'd2a53a53-5f50-4e8b-bcff-73753bbc4c91',
    'user': 'zmaji',
    'date': '15-05-2023',
    'title': 'Overcoming Flight Jitters',
    'content': 'Flying has always made me nervous, but I\'m ' +
        'determined to conquer my fear. Share your tips and experiences in managing flight anxiety.',
    'categories': [
      'Fear of Flying',
      'Coping Strategies',
    ],
    'likes': 11,
    'dislikes': 4,
    'comments': [],
  },
  {
    'postID': '7a1d6b14-7fc4-4cc6-8b1f-194c78583f36',
    'user': 'zmaji',
    'date': '10-07-2023',
    'title': 'Tips for a Stress-Free Flight',
    'content': 'Let\'s discuss how to make air travel less ' +
        'stressful for those with flight anxiety. Share your advice and stories!',
    'categories': [
      'Travel Anxiety',
      'Stress Reduction',
    ],
    'likes': 6,
    'dislikes': 2,
    'comments': [],
  },
  {
    'postID': 'c64ea67f-5bc9-4929-8102-158d6b96ffeb',
    'user': 'zmaji',
    'date': '02-08-2023',
    'title': 'Conquering My Fear of Flying',
    'content': 'I used to be terrified of flying, but I\'ve made significant ' +
        'progress in overcoming my fear. Let\'s share our success stories and support each other.',
    'categories': [
      'Success Stories',
      'Anxiety Victory',
    ],
    'likes': 9,
    'dislikes': 1,
    'comments': [],
  },
  {
    'postID': 'b8f1daaa-0655-4527-a90d-7a52a499de24',
    'user': 'zmaji',
    'date': '19-09-2023',
    'title': 'Managing Flight Anxiety',
    'content': 'Flight anxiety can be overwhelming, but with the right ' +
        'strategies, it\'s manageable. Let\'s discuss what works for you.',
    'categories': [
      'Coping Methods',
      'Anxiety Relief',
    ],
    'likes': 7,
    'dislikes': 5,
    'comments': [],
  },
];

