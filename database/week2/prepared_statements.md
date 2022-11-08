### Prepared statements

1. What is the capital of country X?
```
prepare statement1 from "select country.Name as 'Country', city.Name as 'Capital' from country inner join city on country.Capital = city.ID where country.Name = ?";
```
2. List all the languages spoken in the region Y.
```
prepare statement2 from "select l.Language as 'Languages' from country c inner join countrylanguage l on c.Code = l.CountryCode where c.Region = ? group by l.Language";
```
3. Find the number of cities in which language Z is spoken.
```
prepare statement3 from "select l.Language, count(distinct c.Name) as 'Cities' from city c inner join countrylanguage l on c.CountryCode = l.CountryCode where l.Language = ?";
```
4. List all the continents with the number of languages spoken in each continent.
```
prepare statement4 from "select c.Continent, count(distinct l.Language) as 'Languages' from country c inner join countrylanguage l on c.Code = l.CountryCode group by c.Continent";
```
5. For the country given as input, are there any countries that 1) have the same official language and 2) are in the same continent?
```
*TBA*
```