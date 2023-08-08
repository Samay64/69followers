// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import 'dotenv/config'

export default async function handler(req, res) {
    let response = await fetch("https://replit.com/graphql?a="+Math.random(), {
      "cache": "no-cache",
      "headers": {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Referrer': 'https://replit.com/',
        'Cookie': '',
      },
      "body":process.env.GET_FOLLOWERS,
      "method": "POST"
    })
  let data = await response.json();
  res.status(200).json(JSON.stringify({followers:data.data.userByUsername.followerCount}))
  // res.status(200).send('hi  '+req)
 }
