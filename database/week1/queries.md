### SQL queries

1. What are the names of countries with population greater than 8 million?

`select Name from country where Population > 8000000;`
2. What are the names of countries that have “land” in their names?

`select Name from country where Name like '%land%';`
3. What are the names of the cities with population in between 500,000 and 1 million?

`select Name from city where Population >= 500000 and Population <= 1000000;`
4. What's the name of all the countries on the continent Europe?

`select Name from country where Continent like 'Europe';`
5. List all the countries in the descending order of their surface areas.

`select Name from country order by SurfaceArea desc;`
6. What are the names of all the cities in the Netherlands?

`select city.Name from country inner join city on country.Code = city.CountryCode where country.Name like 'Netherlands';`
7. What is the population of Rotterdam?

`select Population from city where Name like 'Rotterdam';`
8. What are the top 10 countries by Surface Area?

`select Name from country order by SurfaceArea desc limit 10;`
9. What are the top 10 most populated cities?

`select Name from city order by Population desc limit 10;`
10. What is the population of the world?

`select sum(Population) as WorldPopulation from country;`