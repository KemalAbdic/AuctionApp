INSERT INTO public.person (id, birth_date, city, country, email, first_name, gender, last_name, password, phone_number,
                           state, street, zip_code)
VALUES (1, '1978-08-23', 'Philadelphia', 'United States', 'test1@mail.com', 'Kobe', 'MALE', 'Bryant',
        '$2a$10$6aFauPG2n3UvMUKpaH9q0uOBSacNgTSZ5rIRQU5e7WWzMx58E.oHO', '+123456789', 'Pennsylvania', 'GodKnows st',
        '19099');

INSERT INTO public.person (id, birth_date, city, country, email, first_name, gender, last_name, password, phone_number,
                           state, street, zip_code)
VALUES (2, '1993-06-06', 'Cazin', 'Bosnia and Herzegovina', 'test2@mail.com', 'Kemal', 'MALE', 'Abdić',
        '$2a$10$6aFauPG2n3UvMUKpaH9q0uOBSacNgTSZ5rIRQU5e7WWzMx58E.oHO', '+987654321', 'Cazin', 'Unknown st',
        '77220');

INSERT INTO public.person (id, birth_date, city, country, email, first_name, gender, last_name, password, phone_number,
                           state, street, zip_code)
VALUES (3, '1984-04-09', 'Cazin', 'Bosnia and Herzegovina', 'test3@mail.com', 'Muhamed', 'MALE', 'Toromanović',
        '$2a$10$6aFauPG2n3UvMUKpaH9q0uOBSacNgTSZ5rIRQU5e7WWzMx58E.oHO', '+037225883', 'Cazin', 'What st',
        '77220');



INSERT INTO public.category (id, name)
VALUES (1, 'Fashion');
INSERT INTO public.category (id, name)
VALUES (2, 'Accessories');
INSERT INTO public.category (id, name)
VALUES (3, 'Jewellery');
INSERT INTO public.category (id, name)
VALUES (4, 'Shoes');
INSERT INTO public.category (id, name)
VALUES (5, 'Sportswear');
INSERT INTO public.category (id, name)
VALUES (6, 'Home');
INSERT INTO public.category (id, name)
VALUES (7, 'Electronics');
INSERT INTO public.category (id, name)
VALUES (8, 'Mobile');
INSERT INTO public.category (id, name)
VALUES (9, 'Computer');


INSERT INTO public.subcategory (id, name, category_id)
VALUES (1, 'Bike', 1);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (2, 'Subcategory', 1);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (3, 'Romper', 2);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (4, 'Subcategory', 1);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (5, 'Subcategory', 1);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (6, 'Subcategory', 1);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (7, 'Subcategory', 2);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (8, 'Subcategory', 2);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (9, 'Subcategory', 2);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (10, 'Subcategory', 2);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (11, 'Subcategory', 3);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (12, 'Subcategory', 3);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (13, 'Subcategory', 3);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (14, 'Subcategory', 4);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (15, 'Subcategory', 4);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (16, 'Subcategory', 4);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (17, 'Subcategory', 4);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (18, 'Subcategory', 5);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (19, 'Subcategory', 5);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (20, 'Subcategory', 6);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (21, 'Subcategory', 7);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (22, 'Subcategory', 7);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (23, 'Subcategory', 8);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (24, 'Subcategory', 8);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (25, 'Subcategory', 8);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (26, 'Subcategory', 9);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (27, 'Subcategory', 9);
INSERT INTO public.subcategory (id, name, category_id)
VALUES (28, 'Subcategory', 9);



INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (1, '2021-12-31 11:24:01.000000', '2021-11-10 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Peugeot Ventoux PH501 Classic Road Bike 1986', '+389123412', false, 'LARGE', 48.99, 'Adema Buća 45', '71000',
        1,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (2, '2021-12-30 11:24:01.000000', '2021-11-12 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Pantera Logo Romper 24 Months Black ', '+333444555', false, 'SMALL', 42.99, 'Franje Račkog 3', '71000', 2,
        2);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (3, '2021-12-29 11:24:01.000000', '2021-11-01 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        '2020 BMW R 1250 GS Adventure Ice Grey Low Suspension', '+389123499', false, 'LARGE', 54.99, 'Adema Buća 45',
        '71000', 1,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (4, '2021-12-28 11:24:01.000000', '2021-11-01 11:23:57.000000', 'Bihać', 'RED',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Golden watch', '+389123499', false, 'LARGE', 399.99, 'Kulina bana 33', '77000', 3,
        2);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (5, '2021-12-27 11:24:01.000000', '2021-10-16 11:23:57.000000', 'Bihać', 'RED',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Jacket - Leather', '+389123499', false, 'LARGE', 98.99, 'Kulina bana 33', '77000', 3,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (6, '2021-12-26 11:24:01.000000', '2021-10-15 11:23:57.000000', 'Cazin', 'WHITE',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'White shirt - Large', '+389123499', false, 'LARGE', 14.99, 'Kulina bana 33', '77220', 3,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (7, '2021-12-25 11:24:01.000000', '2021-10-14 11:23:57.000000', 'Bihać', 'RED',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Various Pants - Blue', '+389123499', false, 'LARGE', 53.99, 'Kulina bana 33', '77000', 3,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (8, '2021-12-24 11:24:01.000000', '2021-11-13 11:23:57.000000', 'Bužim', 'BLUE',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Vintage Telephone - Rotary', '+389123499', false, 'LARGE', 221.99, 'Kulina bana 33', '77000', 3,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (9, '2021-12-23 11:24:01.000000', '2021-11-10 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Peugeot Ventoux PH501 1986', '+389123412', false, 'LARGE', 49.99, 'Adema Buća 45', '71000',
        1,
        11);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (10, '2021-12-22 11:24:01.000000', '2021-11-12 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Pantera Logo Romper 12 Months Black ', '+333444555', false, 'SMALL', 43.99, 'Franje Račkog 3', '71000', 1,
        12);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (11, '2021-12-18 11:24:01.000000', '2021-11-18 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        '2020 BMW R 1250 GS Adventure', '+389123499', false, 'LARGE', 55.99, 'Adema Buća 45',
        '71000', 1, 1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (13, '2021-12-16 11:24:01.000000', '2021-10-16 11:23:57.000000', 'Bihać', 'RED',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Jacket', '+389123499', false, 'LARGE', 99.99, 'Kulina bana 33', '77000', 1,
        10);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (14, '2021-12-19 11:24:01.000000', '2021-10-11 11:23:57.000000', 'Cazin', 'WHITE',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'White shirt', '+389123499', false, 'LARGE', 15.99, 'Kulina bana 33', '77220', 1,
        19);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (15, '2021-12-20 11:24:01.000000', '2021-10-12 11:23:57.000000', 'Bihać', 'RED',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Various Pants', '+389123499', false, 'LARGE', 55.99, 'Kulina bana 33', '77000', 2,
        22);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (16, '2021-12-21 11:24:01.000000', '2021-11-11 11:23:57.000000', 'Bužim', 'BLUE',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Vintage Telephone', '+389123499', false, 'LARGE', 222.99, 'Kulina bana 33', '77000', 3,
        28);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (1,
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        1, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (2,
        'https://images.unsplash.com/photo-1580978611222-9898f853e74d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        1, false);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (3,
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        1, false);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (4,
        'https://images.unsplash.com/photo-1622290319146-7b63df48a635?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        2, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (5,
        'https://images.unsplash.com/photo-1524275539700-cf51138f679b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        2, false);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (6,
        'https://images.unsplash.com/photo-1529720317453-c8da503f2051?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        2, false);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (7,
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        2, false);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (8,
        'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        3, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (9,
        'https://images.unsplash.com/photo-1580978611222-9898f853e74d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        3, false);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (10,
        'https://images.unsplash.com/photo-1618215649872-6e3143a716ec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        4, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (11,
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        5, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (12,
        'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        6, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (13,
        'https://images.unsplash.com/photo-1525598912003-663126343e1f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        8, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (14,
        'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        7, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (15,
        'https://images.unsplash.com/photo-1529720317453-c8da503f2051?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        9, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (16,
        'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        10, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (17,
        'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        11, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (19,
        'https://images.unsplash.com/photo-1529720317453-c8da503f2051?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        13, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (20,
        'https://images.unsplash.com/photo-1524275539700-cf51138f679b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        14, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (21,
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        15, true);

INSERT INTO public.picture (id, url, product_id, featured)
VALUES (22,
        'https://images.unsplash.com/photo-1580978611222-9898f853e74d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680',
        16, true);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (1, 50, '2021-11-15 11:49:29.000000', 2, 1);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (2, 51, '2021-11-15 11:51:29.000000', 3, 1);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (3, 52, '2021-11-15 11:53:29.000000', 1, 1);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (4, 44, '2021-11-15 11:49:29.000000', 1, 2);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (5, 45, '2021-11-15 11:55:29.000000', 3, 2);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (6, 46, '2021-11-15 11:59:29.000000', 1, 2);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (7, 56, '2021-11-15 11:56:29.000000', 2, 2);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (8, 57, '2021-11-15 11:58:29.000000', 1, 2);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (9, 57, '2021-11-15 11:58:29.000000', 2, 3);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (10, 401, '2021-11-15 11:58:29.000000', 1, 4);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (11, 101, '2021-11-15 11:58:29.000000', 2, 5);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (12, 17, '2021-11-15 11:58:29.000000', 2, 6);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (13, 57, '2021-11-15 11:58:29.000000', 2, 7);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (14, 225, '2021-11-15 11:58:29.000000', 2, 8);

INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (15, 225, '2021-11-15 11:58:29.000000', 2, 9);
INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (16, 225, '2021-11-15 11:58:29.000000', 2, 10);
INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (17, 225, '2021-11-15 11:58:29.000000', 2, 11);
INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (19, 225, '2021-11-15 11:58:29.000000', 2, 13);
INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (20, 225, '2021-11-15 11:58:29.000000', 2, 14);
INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (21, 225, '2021-11-15 11:58:29.000000', 2, 15);
INSERT INTO public.bid (id, bid_amount, bid_time, person_id, product_id)
VALUES (22, 225, '2021-11-15 11:58:29.000000', 2, 16);

