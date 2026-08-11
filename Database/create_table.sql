CREATE DATABASE kharido_com_db;
USE kharido_com_db;

CREATE TABLE roles (
    roleid INT PRIMARY KEY AUTO_INCREMENT,
    rolename VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO roles (rolename)
VALUES ('ADMIN'),
       ('SELLER'),
       ('CUSTOMER');

CREATE TABLE users (
    userid INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    roleid INT NOT NULL,
    status ENUM('ACTIVE','INACTIVE','BLOCKED') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (roleid) REFERENCES roles(roleid)
);

CREATE TABLE customer_profiles (
    customerid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL UNIQUE,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    phone VARCHAR(15) UNIQUE,
    dob DATE,
    gender ENUM('MALE','FEMALE','OTHER'),
    FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE seller_profiles (
    sellerid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL UNIQUE,
    shop_name VARCHAR(100) NOT NULL,
    gst_number VARCHAR(50),
    phone VARCHAR(15),
    approval_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    approved_by INT,
    approved_date DATETIME,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (approved_by) REFERENCES users(userid)
);

CREATE TABLE addresses (
    addressid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    address_name VARCHAR(50) NOT NULL DEFAULT 'Home',
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(10),
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE categories (
    categoryid INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE subcategories (
    subcategoryid INT PRIMARY KEY AUTO_INCREMENT,
    categoryid INT NOT NULL,
    subcategory_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (categoryid) REFERENCES categories(categoryid)
);

CREATE TABLE brands (
    brandid INT PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    productid INT PRIMARY KEY AUTO_INCREMENT,
    sellerid INT NOT NULL,
    categoryid INT NOT NULL,
    subcategoryid INT NOT NULL,
    brandid INT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    approval_status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sellerid) REFERENCES seller_profiles(sellerid),
    FOREIGN KEY (categoryid) REFERENCES categories(categoryid),
    FOREIGN KEY (subcategoryid) REFERENCES subcategories(subcategoryid),
    FOREIGN KEY (brandid) REFERENCES brands(brandid)
);

CREATE TABLE product_images (
    imageid INT PRIMARY KEY AUTO_INCREMENT,
    productid INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (productid) REFERENCES products(productid)
);

CREATE TABLE carts (
    cartid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE cart_items (
    cartitemid INT PRIMARY KEY AUTO_INCREMENT,
    cartid INT NOT NULL,
    productid INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    price_at_added DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (cartid) REFERENCES carts(cartid),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

CREATE TABLE orders (
    orderid INT PRIMARY KEY AUTO_INCREMENT,
    userid INT NOT NULL,
    addressid INT NOT NULL,

    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    total_amount DECIMAL(12,2) NOT NULL,

    payment_status ENUM(
        'PENDING',
        'PAID',
        'FAILED',
        'REFUNDED'
    ) DEFAULT 'PENDING',

    order_status ENUM(
        'PLACED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED'
    ) DEFAULT 'PLACED',

    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (addressid) REFERENCES addresses(addressid)
);

CREATE TABLE order_items (
    orderitemid INT PRIMARY KEY AUTO_INCREMENT,

    orderid INT NOT NULL,
    productid INT NOT NULL,
    sellerid INT NOT NULL,

    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,

    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (productid) REFERENCES products(productid),
    FOREIGN KEY (sellerid) REFERENCES seller_profiles(sellerid)
);

CREATE TABLE payments (
    paymentid INT PRIMARY KEY AUTO_INCREMENT,

    orderid INT NOT NULL,

    payment_method ENUM(
        'UPI',
        'CARD',
        'NETBANKING',
        'COD'
    ),

    transaction_id VARCHAR(100),

    amount DECIMAL(12,2) NOT NULL,

    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status ENUM(
        'PENDING',
        'SUCCESS',
        'FAILED'
    ) DEFAULT 'PENDING',

    FOREIGN KEY (orderid) REFERENCES orders(orderid)
);

CREATE TABLE refunds (
    refundid INT PRIMARY KEY AUTO_INCREMENT,

    orderid INT NOT NULL,
    userid INT NOT NULL,
    paymentid INT NOT NULL,

    refund_amount DECIMAL(12,2),

    reason TEXT,

    refund_status ENUM(
        'PENDING',
        'APPROVED',
        'REJECTED',
        'COMPLETED'
    ) DEFAULT 'PENDING',

    requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    approved_by INT,
    approved_date DATETIME,

    FOREIGN KEY (orderid) REFERENCES orders(orderid),
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (paymentid) REFERENCES payments(paymentid),
    FOREIGN KEY (approved_by) REFERENCES users(userid)
);

CREATE TABLE reviews (
    reviewid INT PRIMARY KEY AUTO_INCREMENT,

    userid INT NOT NULL,
    productid INT NOT NULL,

    rating INT CHECK(rating BETWEEN 1 AND 5),

    review_text TEXT,

    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

CREATE TABLE wishlist (
    wishlistid INT PRIMARY KEY AUTO_INCREMENT,

    userid INT NOT NULL,
    productid INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (productid) REFERENCES products(productid)
);

CREATE TABLE coupons (
    couponid INT PRIMARY KEY AUTO_INCREMENT,

    coupon_code VARCHAR(50) UNIQUE NOT NULL,

    discount_percentage DECIMAL(5,2),

    start_date DATE,
    end_date DATE,

    status ENUM(
        'ACTIVE',
        'INACTIVE'
    ) DEFAULT 'ACTIVE'
);

CREATE TABLE notifications (
    notificationid INT PRIMARY KEY AUTO_INCREMENT,

    userid INT NOT NULL,

    message TEXT NOT NULL,

    status ENUM(
        'UNREAD',
        'READ'
    ) DEFAULT 'UNREAD',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE activity_logs (
    logid INT PRIMARY KEY AUTO_INCREMENT,

    userid INT NOT NULL,

    action VARCHAR(255),

    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userid) REFERENCES users(userid)
);


INSERT INTO roles
(roleid,rolename)
VALUES
(4,'DELIVERY_PARTNER');


CREATE TABLE delivery_partners(
    deliveryid INT PRIMARY KEY AUTO_INCREMENT,

    userid INT NOT NULL,

    city VARCHAR(100) UNIQUE NOT NULL,

    company_name VARCHAR(100) NOT NULL,

    phone VARCHAR(15),

    status ENUM(
        'ACTIVE',
        'INACTIVE'
    ) DEFAULT 'ACTIVE',

    FOREIGN KEY(userid)
    REFERENCES users(userid)
);


CREATE TABLE delivery_assignments(
    assignmentid INT PRIMARY KEY AUTO_INCREMENT,

    orderid INT NOT NULL,

    deliveryid INT NOT NULL,

    assigned_date DATETIME
    DEFAULT CURRENT_TIMESTAMP,

    pickup_status ENUM(
        'PENDING',
        'PICKED',
        'IN_TRANSIT',
        'DELIVERED'
    ) DEFAULT 'PENDING',

    FOREIGN KEY(orderid)
    REFERENCES orders(orderid),

    FOREIGN KEY(deliveryid)
    REFERENCES delivery_partners(deliveryid)
);


ALTER TABLE payments
ADD COLUMN user_id INT NOT NULL AFTER order_id;

ALTER TABLE payments
ADD COLUMN remarks VARCHAR(255) NULL AFTER status;

ALTER TABLE orders
MODIFY COLUMN order_status
ENUM(
'PENDING_PAYMENT',
'PLACED',
'PROCESSING',
'SHIPPED',
'DELIVERED',
'CANCELLED'
)
NOT NULL;