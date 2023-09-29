import 'dotenv/config'

export default async function handler(req, res) {
  let key = process.env.APP_KEY_MOON
  let id = process.env.APP_ID_MOON

  console.log(key)
  console.log(id)

  const authString = btoa(`${id}:${key}`);
  const options = {
  method: 'GET',
  headers: {
    'Authorization':`Basic ${authString}`,
  }
};

  let latitude = '28.7041'
  let longitude = '-77.216721'
let response = await fetch('https://api.astronomyapi.com/api/v2/bodies/positions?longitude=-77.216721&latitude=28.7041&elevation=1&from_date=2023-09-29&to_date=2023-09-29&time=13:58:18', options)
let result = await response.json()
  
  res.status(200).json(result)
  // res.status(200).send('hi  '+req)
 }
