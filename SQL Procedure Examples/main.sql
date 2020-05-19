
/*
    This code below works in conjunction with 2 other procedures:
    cycleWeeks() and cycleIds()
    
    1. cycleWeeks(in idn int(11), out res int(11)): it basically cycles through 'meal_table' adding the values 
    that cross matches with a ID passed in and returns the sum of the `meal_table` columns. At the end the res
    variable holds the sum of the person with `idn` cross match with the person's `meal_table` columns.
    2. cycleIds(): loops through all inputmeals_id calling cycleWeeks() and then updates output_meals_by_customer by that id
    and the specific item we choose here in the main 
*/
  
 
 SET SQL_SAFE_UPDATES = 0; 
 drop table if exists output_meals_by_customer;
 -- create a table with data that we will later use for output meals by customer
 create table output_meals_by_customer select inputorders_id, Date_Submitted, Last_Name, First_Name, Email, Delivery_Time, Phone_Number from inputorders;

-- Add the necessary rows for each specialize item below 
ALTER TABLE output_meals_by_customer
ADD COLUMN saag INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Rainbow Chopped Salad w/ Red Curry Dressing` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Veggie Medley Soup` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `ROASTED CAULIFLOWER CURRY` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Holiday Salad w/ Poppyseed Dressing` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Gingerbread Oats` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Original Smoothie` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Almond Butter Smoothie` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Energizer Smoothie` INTEGER default 0;
ALTER TABLE output_meals_by_customer
ADD COLUMN `Seasonal Smoothie` INTEGER default 0;


drop table if exists user_ids;
-- Save the result all inputOrders_id into user_ids table 
create table user_ids SELECT `inputOrders_id` FROM inputOrders; 

-- Create a tempTable containing all columns needed to be totaled  
drop table if exists meal_table;
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%wkly_spcl_1%' ; 
call cycleIds("`Saag`");
drop table meal_table;
-- Create a tempTable containing all wk2 special needed to be totaled  
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%WKLY_SPCL_2%' ; 
call cycleIds("`Rainbow Chopped Salad w/ Red Curry Dressing`");
drop table meal_table;

-- weekly special 3
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%WKLY_SPCL_3%' ; 
call cycleIds("`Veggie Medley Soup`");
drop table meal_table;

-- weekly special sea faves 1 
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%SEAS_FAVE_1%' ; 
call cycleIds("`ROASTED CAULIFLOWER CURRY`");
drop table meal_table;

-- weekly special sea faves 2
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%SEAS_FAVE_2%' ; 
call cycleIds("`Holiday Salad w/ Poppyseed Dressing`");
drop table meal_table;

-- weekly special sea faves 3
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%SEAS_FAVE_3%' ; 
call cycleIds("`Gingerbread Oats`");
drop table meal_table;

-- THE ORIGINAL
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%THE_ORIGINAL%' ; 
call cycleIds("`Original Smoothie`");
drop table meal_table;

-- almond butter
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%ALMOND_BUTTER%' ; 
call cycleIds("`Almond Butter Smoothie`");
drop table meal_table;

-- THE ENERGIZER
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%THE_ENERGIZER%' ; 
call cycleIds("`Energizer Smoothie`");
drop table meal_table;

-- SEASONAL SMOOTHIE
CREATE TABLE meal_table select COLUMN_NAME from information_schema.columns 
where table_name='inputOrders' and column_name like '%SEASONAL_SMOOTHIE%' ; 
call cycleIds("`Seasonal Smoothie`");
drop table meal_table;

-- create table for output meals total 
 drop table if exists output_meals_total;
 create table output_meals_total select Actual_Meals from inputmeals;
-- Add the required rows for output meals total 
ALTER TABLE output_meals_total
ADD COLUMN qty INTEGER default 0; -- add quantity column 

-- UPDATE output_meals_by_customer SET `Rainbow Chopped Salad w/ Red Curry Dressing` = 99 WHERE inputOrders_id = 2; -- test statement

-- Notice that when we pass the string into sum, we backticks to notify the compiler it's a literal string
-- but when we use it in the where clause, we need to use quotes because we are comparing it as a string
update output_meals_total set qty = (select sum(saag) from output_meals_by_customer) where Actual_meals = 'saag';
update output_meals_total set qty = (select sum( `Rainbow Chopped Salad w/ Red Curry Dressing`) from output_meals_by_customer) where Actual_meals = 'Rainbow Chopped Salad w/ Red Curry Dressing';
update output_meals_total set qty = (select sum( `Veggie Medley Soup`) from output_meals_by_customer) where Actual_meals = 'Veggie Medley Soup';
update output_meals_total set qty = (select sum( `ROASTED CAULIFLOWER CURRY`) from output_meals_by_customer) where Actual_meals = 'ROASTED CAULIFLOWER CURRY';
update output_meals_total set qty = (select sum( `Holiday Salad w/ Poppyseed Dressing`) from output_meals_by_customer) where Actual_meals = 'Holiday Salad w/ Poppyseed Dressing';
update output_meals_total set qty = (select sum( `Gingerbread Oats`) from output_meals_by_customer) where Actual_meals = 'Gingerbread Oats';
update output_meals_total set qty = (select sum( `Original Smoothie`) from output_meals_by_customer) where Actual_meals = 'Original Smoothie';
update output_meals_total set qty = (select sum( `Almond Butter Smoothie`) from output_meals_by_customer) where Actual_meals = 'Almond Butter Smoothie';
update output_meals_total set qty = (select sum( `Energizer Smoothie`) from output_meals_by_customer) where Actual_meals = 'Energizer Smoothie';
update output_meals_total set qty = (select sum( `Seasonal Smoothie`) from output_meals_by_customer) where Actual_meals = 'Seasonal Smoothie';

-- Some test statements below:

select * from output_meals_by_customer;
select * from output_meals_total;
 SET SQL_SAFE_UPDATES = 1; 