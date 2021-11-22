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
VALUES (1, 'Sports');

INSERT INTO public.category (id, name)
VALUES (2, 'Fashion');


INSERT INTO public.subcategory (id, name, category_id)
VALUES (1, 'Bike', 1);

INSERT INTO public.subcategory (id, name, category_id)
VALUES (2, 'Romper', 2);



INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (1, '2021-12-09 11:24:01.000000', '2021-11-15 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        'Peugeot Ventoux PH501 Classic Road Bike 1986', '+389123412', false, 'LARGE', 49.99, 'Adema Buća 45', '71000', 1,
        1);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (2, '2021-12-09 11:24:01.000000', '2021-11-15 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        ' Pantera Logo Romper 24 Months Black ', '+333444555', false, 'SMALL', 43.99, 'Franje Račkog 3', '71000', 2,
        2);

INSERT INTO public.product (id, auction_end, auction_start, city, color, country, description, name, phone_number,
                            shipping, size, starting_price, street, zip_code, person_id, subcategory_id)
VALUES (3, '2021-12-09 11:24:01.000000', '2021-11-15 11:23:57.000000', 'Sarajevo', 'BLACK',
        'Bosnia and Herzegovina',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sodales condimentum luctus. Morbi varius efficitur nunc, quis blandit eros vulputate sed. Suspendisse consectetur dui tellus, in hendrerit ante iaculis et.',
        '2020 BMW R 1250 GS Adventure Ice Grey Low Suspension', '+389123499', false, 'LARGE', 55.99, 'Adema Buća 45', '71000', 1,
        1);



INSERT INTO public.picture (id, url, product_id)
VALUES (1, 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 1);

INSERT INTO public.picture (id, url, product_id)
VALUES (2, 'https://images.unsplash.com/photo-1580978611222-9898f853e74d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 1);

INSERT INTO public.picture (id, url, product_id)
VALUES (3, 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 1);

INSERT INTO public.picture (id, url, product_id)
VALUES (4, 'https://images.unsplash.com/photo-1622290319146-7b63df48a635?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 2);

INSERT INTO public.picture (id, url, product_id)
VALUES (5, 'https://images.unsplash.com/photo-1524275539700-cf51138f679b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 2);

INSERT INTO public.picture (id, url, product_id)
VALUES (6, 'https://images.unsplash.com/photo-1529720317453-c8da503f2051?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 2);

INSERT INTO public.picture (id, url, product_id)
VALUES (7, 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 2);

INSERT INTO public.picture (id, url, product_id)
VALUES (8, 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 3);

INSERT INTO public.picture (id, url, product_id)
VALUES (9, 'https://images.unsplash.com/photo-1580978611222-9898f853e74d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHw0OTA1ODYyfHx8fHx8fDE2Mzc1NzA4Nzc&ixlib=rb-1.2.1&q=80&w=680', 3);


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

