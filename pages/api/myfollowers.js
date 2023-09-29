import 'dotenv/config'
import client from '@replit/database'
import fetch from 'node-fetch'

export default async function handler(req, res) {
  const db = new client()
  const cm = process.env.NEW_COOK
  const query = req.query
  let response = await fetch("https://replit.com/graphql?a="+Math.random()+Math.random(), {
      "cache": "no-cache",
      "headers": {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Referrer': 'https://replit.com/@CodeMagnon',
        'currentUser':'CodeMagnon',
        'Cookie':cm,
      },
      "body":JSON.stringify(    {
        "operationName": "FollowModalFollowers",
        "variables": {
            "username": "CodeMagnon",
            "count": 20
        },
        "query": "query FollowModalFollowers($username: String!, $after: String, $count: Int) {\n  currentUser {\n    id\n    __typename\n  }\n  user: userByUsername(username: $username) {\n    id\n    followers(after: $after, count: $count) {\n      items {\n        id\n        ...FollowModalUser\n        __typename\n      }\n      pageInfo {\n        hasNextPage\n        nextCursor\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment FollowModalUser on User {\n  ...UserLinkUser\n  id\n  username\n  fullName\n  image\n  isFollowedByCurrentUser\n  followerCount\n  __typename\n}\n\nfragment UserLinkUser on User {\n  id\n  url\n  username\n  __typename\n}\n"
    }),
      "method": "POST"
  })
  let data = await response.json();
res.status(200).json(JSON.stringify(
  {
  followers:data.data.user.followers.items,
  count:query.count
  }))
}