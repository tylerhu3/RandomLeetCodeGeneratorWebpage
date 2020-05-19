

-- This function basically takes a id number 'idn' and loops
-- through a table 'meal_table_table' which contains a list of 
-- row names that can be found in inputOrders table
-- and using the row names from 'meal_table_table' and 
-- the id, it will sum up the number between that information
-- into variable total 
DROP PROCEDURE IF EXISTS cycleWeeks;
delimiter //
CREATE PROCEDURE cycleWeeks(in idn int, out res int)
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE temp VARCHAR(50) DEFAULT "";
    DECLARE total INTEGER DEFAULT 0;
	declare meals CURSOR FOR SELECT * FROM meal_table;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;
	-- select first_name, last_name from inputOrders where inputorders_id = idn;
	open meals;
	getColumn: LOOP
			FETCH meals INTO temp;
			IF finished = 1 THEN LEAVE getColumn; END IF;
            set @s = concat("SELECT `", temp, "` INTO @subtotal FROM `inputOrders` where `inputorders_id` = ", idn);
            PREPARE stmt2 FROM @s;
            EXECUTE stmt2;
            if @subtotal is NULL Then set @subtotal = 0; end if;
            -- select @subtotal; -- print statement 
            set total = @subtotal + total;
            DEALLOCATE PREPARE stmt2;
		END LOOP getColumn;
    set res = total;
	close meals;
End
//

 call cycleWeeks(1, @returnVal);
 select  @returnVal;

