

-- This function basically loops through all id's of inputmeals which is
-- held in table user_ids. And will then call x1() with that id number to update the
-- current item, for example colName = 'saag' will update saag from output_meals_by_customer table
-- with the new value gotten from x1()
DROP PROCEDURE IF EXISTS cycleIds;
delimiter //
CREATE PROCEDURE cycleIds(in colName varchar(55))
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE temp VARCHAR(50) DEFAULT "";
    DECLARE total INTEGER DEFAULT 0;
	declare ids CURSOR FOR SELECT * FROM user_ids; -- user_ids is a table of all id's in input and we are using cursor to loop
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;
	open ids;
	getColumn: LOOP
			FETCH ids INTO temp;
			IF finished = 1 THEN 
				LEAVE getColumn;
			END IF;
            call cycleWeeks(temp, @returnVal);
           -- UPDATE output_meals_by_customer SET `Rainbow Chopped Salad w/ Red Curry Dressing` = 99 WHERE inputOrders_id = 2;
           -- select * from output_meals_by_customer;
           
            set @s = concat("UPDATE output_meals_by_customer SET ", colName, " = ", @returnVal, " where `inputorders_id` = ", temp );
            PREPARE stmt2 FROM @s;
            EXECUTE stmt2;
            DEALLOCATE PREPARE stmt2;
		END LOOP getColumn;
	close ids;
End
//
-- in the current problem, i can't pass in string as parameter for
-- select query
-- other wise I think we would be good tbh 

select * from output_meals_by_customer;

call cycleIds("`saag`");
-- the below is required to update data without primary key


UPDATE output_meals_by_customer SET colName = @returnVal WHERE inputOrders_id = temp;
SET SQL_SAFE_UPDATES = 0; 






