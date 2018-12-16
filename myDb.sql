-- table seeding

CREATE TABLE measurement
( measurement_id SERIAL PRIMARY KEY
, measurement_name VARCHAR(255) NOT NULL
);

CREATE TABLE recipe
( recipe_id SERIAL PRIMARY KEY
, recipe_name VARCHAR(255) NOT NULL
, recipe_desc VARCHAR(255)
);

CREATE TABLE ingredient
( ingredient_id SERIAL PRIMARY KEY
, ingredient_name VARCHAR(255) NOT NULL
, amount FLOAT8 NOT NULL
, measurement_id INT NOT NULL
, recipe_id INT REFERENCES recipe NOT NULL
);

CREATE TABLE instruction
( instruction_id SERIAL NOT NULL
, instruction_desc TEXT NOT NULL
, instruction_order INT NOT NULL
, recipe_id INT REFERENCES recipe
);

--create DB user

CREATE USER dbuser WITH PASSWORD '1234';
GRANT SELECT, INSERT, UPDATE, DELETE ON s_user, keyword, measurement, recipe, recipe_keyword_group, ingredient, instruction TO dbuser;
GRANT USAGE, SELECT ON SEQUENCE s_user_s_user_id_seq, keyword_keyword_id_seq, measurement_measurement_id_seq, recipe_recipe_id_seq, ingredient_ingredient_id_seq, instruction_instruction_id_seq TO dbuser;

ALTER TABLE ingredient ALTER COLUMN amount TYPE float8;

-- measurement seeding

INSERT INTO measurement
( measurement_name
)
VALUES
( 'cup/s'
);

INSERT INTO measurement
( measurement_name
)
VALUES
( 'tablespoon/s'
);

INSERT INTO measurement
( measurement_name
)
VALUES
( 'teaspoon/s'
);

INSERT INTO measurement
( measurement_name
)
VALUES
( 'quart/s'
);

INSERT INTO measurement
( measurement_name
)
VALUES
( 'gallon/s'
);

INSERT INTO measurement
( measurement_name
)
VALUES
( 'pinch/es'
);

INSERT INTO measurement
( measurement_name
)
VALUES
( 'unit/s'
);

-- recipe seeding

INSERT INTO recipe 
( recipe_name
, recipe_desc)
VALUES
( 'Cheerios'
, 'This is a plain bowl of cereal'
);

INSERT INTO recipe 
( recipe_name
, recipe_desc)
VALUES
( 'Honey Cheerios'
, 'This is a sweet bowl of cereal'
);

INSERT INTO recipe 
( recipe_name
, recipe_desc)
VALUES
( 'Smoothie'
, 'This is an amazing smoothie'
);

INSERT INTO recipe 
( recipe_name
, recipe_desc)
VALUES
( 'Cheese and Crackers'
, 'This is almost all I know how to make'
);

-- ingredient seeding

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Peanut Butter'
, 1
, 2
, 3
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Almond Milk'
, .5
, 1
, 3
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Cocoa Powder'
, 1
, 2
, 3
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Frozen Banana'
, 1
, 7
, 3
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Ice'
, 1
, 1
, 3
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Honey'
, 1
, 2
, 3
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Milk'
, 1
, 1
, 1
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Cheerios'
, 2
, 1
, 1
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Milk'
, 1
, 1
, 2
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Cheerios'
, 2
, 1
, 2
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Honey'
, 1
, 2
, 2
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Crackers'
, 10
, 7
, 4
);

INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( 'Sliced Cheese'
, 10
, 7
, 4
);

-- instruction seeding

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add all ingredients to blender'
, 1
, 3
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Blend for 1 minute'
, 2
, 3
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Pour into glass and enjoy!'
, 3
, 3
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add cereal to bowl'
, 1
, 1
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add milk to bowl'
, 2
, 1
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add spoon to bowl'
, 3
, 1
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add cereal to bowl'
, 1
, 2
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add milk to bowl'
, 2
, 2
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add honey on top of cereal'
, 3
, 2
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add spoon to bowl'
, 4
, 2
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add crackers to plate'
, 1
, 4
);

INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( 'Add cheese to plate'
, 2
, 4
);

-- DATA LAYER QUERIES
		
--	addUser
INSERT INTO s_user
( s_user_name
, s_user_password
)
VALUES
( $1::text
, $2::text
);

--	addRecipe.general
INSERT INTO recipe 
( recipe_name
, recipe_desc
, s_user_id)
VALUES
( $1::text
, $2::text
, $3::int
);

--	addRecipe.ingredients
INSERT INTO ingredient
( ingredient_name
, amount
, measurement_id
, recipe_id
)
VALUES
( $1::text
, $2::int
, $3::int
, $4::int
);

--	addRecipe.instructions
INSERT INTO instruction
( instruction_desc
, instruction_order
, recipe_id
)
VALUES
( $1::text
, $2::int
, $3::int
);

--	viewRecipe.general
SELECT
  recipe.recipe_name
, recipe.recipe_desc
, s_user.s_user_name
FROM recipe
INNER JOIN s_user ON s_user.s_user_id = recipe.s_user_id
WHERE recipe_id = $1::int;

--	viewRecipe.ingredients
SELECT 
  ingredient.ingredient_name
, ingredient.amount
, measurement.measurement_name
FROM ingredient 
INNER JOIN measurement ON measurement.measurement_id = ingredient.measurement_id
WHERE recipe_id = $1::int;

--	viewRecipe.instructions
SELECT 
  instruction_desc
FROM instruction 
WHERE recipe_id = $1::int
ORDER BY instruction_order ASC;

--	updateRecipe.general
UPDATE recipe
SET 
  recipe_name = $1::text
, recipe_desc = $2::text
, s_user_id = $3::int
WHERE recipe_id = $4::int;

--	updateRecipe.ingredient
UPDATE ingredient
SET 
  ingredient_name = $1::text
, amount = $2::int
, measurement_id = $3::int
WHERE ingredient_id = $4::int;

--	updateRecipe.instructions
UPDATE instruction
SET
  instruction_desc = $1::text
WHERE instruction_id = $2::int;

--	deleteRecipeAll.general
DELETE FROM recipe
WHERE recipe_id = $1::int;

--	deleteRecipe.ingredient
DELETE FROM ingredient
WHERE ingredient_id = $1::int;

--	deleteRecipe.instructions
DELETE FROM instruction
WHERE instruction_id = $1::int;

-- HELPER QUERIES 

SELECT keyword_name WHERE keyword_id = $1::int;

SELECT s_user_name WHERE s_user_id = $1::int;

SELECT measurement_name WHERE measurement_id = $1::int;

