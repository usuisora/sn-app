
CREATE TABLE Users (id Serial Primary key,
                                      username Text, login Text UNIQUE NOT NULL,
                                                                       password Text NOT NULL) ;


INSERT INTO Users (username, login, password)
VALUES ('Joseph Joestar',
        'joseph',
        '1234'),('Jonathan Joestar',
                         'jonathan',
                         '1234'),('Jotaro Kujo',
                                  'jotaro',
                                  '1234'),('Johnny Cash',
                                           'johnny',
                                           '1234'),('Dio Brando',
                                                    'dio',
                                                    '123456789') ;


CREATE TABLE Friends
        (user_1 INTEGER , user_2 INTEGER,state TEXT NOT NULL,
                                                    PRIMARY KEY(user_1, user_2),
         FOREIGN KEY (user_1) REFERENCES Users (id) ON DELETE CASCADE,
         FOREIGN KEY (user_2) REFERENCES Users (id) ON DELETE CASCADE);


insert INTO friends(user_1, user_2, state)
Values (1,
        3,
        'friends'), (2,
                     4,
                     'friends'),(2,
                                 3,
                                 'incoming'), (1,
                                               4,
                                               'outgoing'),(1,
                                                            2,
                                                            'incoming');

