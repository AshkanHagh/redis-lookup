import redis from './redis.config';
import { countryList } from './country.data';

countryList.forEach((country) => {
	const term = country.toUpperCase()
	const terms : {score : 0; member : string}[] = []
  
	for (let i = 0; i <= term.length; i++) {
	  	terms.push({score : 0, member : term.substring(0, i)})
	}
	terms.push({score : 0, member : term + '*'})
  
	// @ts-expect-error bug
	const populateDb = async () => await redis.zadd('terms', ...terms)
	populateDb()
})