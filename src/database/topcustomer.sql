-- QUERY 1)

CREATE TABLE orders (
  orderid SERIAL PRIMARY KEY,
  customerid INTEGER,
  orderdate DATE
);
-- QUERY 2)

CREATE TABLE order_details (
  orderdetailid SERIAL PRIMARY KEY,
  orderid INTEGER,
  productid INTEGER,
  unitprice DECIMAL(10, 2),
  quantity INTEGER,
  FOREIGN KEY (orderid) REFERENCES orders(orderid)
);

-- QUERY 3)

INSERT INTO orders (orderid, customerid, orderdate) VALUES
  (10248, 3, '1996-07-04'),
  (10249, 1, '1996-07-05'),
  (10253, 2, '1996-07-10'),
  (10274, 3, '1996-08-06'),
  (10275, 4, '1996-08-07'),
  (10296, 5, '1996-09-03');

-- QUERY 4)

INSERT INTO order_details (orderid, productid, unitprice, quantity) VALUES
  (10248, 42, 9, 10),
  (10248, 72, 34, 5),
  (10249, 14, 18, 9),
  (10249, 51, 42, 40),
  (10248, 11, 14, 12),
  (10253, 31, 10, 20),
  (10253, 39, 14, 42),
  (10253, 49, 16, 40),
  (10274, 71, 17, 20),
  (10274, 72, 27, 7),
  (10275, 24, 3, 12),
  (10275, 59, 44, 6),
  (10296, 11, 16, 12),
  (10296, 16, 13, 30),
  (10296, 69, 28, 15);
  
-- QUERY 5)

  WITH order_summary AS (
  SELECT
    EXTRACT(YEAR FROM orderdate) AS year,
    EXTRACT(MONTH FROM orderdate) AS month,
    customerid,
    SUM(quantity * unitprice) AS total_order_value
  FROM
    orders
    JOIN order_details ON orders.orderid = order_details.orderid
  GROUP BY
    year,
    month,
    customerid
),
ranked_orders AS (
  SELECT
    year,
    month,
    customerid,
    total_order_value,
    RANK() OVER (
      PARTITION BY year, month
      ORDER BY total_order_value DESC, customerid
    ) AS order_rank
  FROM
    order_summary
)
SELECT
  year,
  month,
  customerid,
  total_order_value AS total_monthly_order_value
FROM
  ranked_orders
WHERE
  order_rank = 1
ORDER BY
  year,
  month;