-- supabase/migrations/002_seed.sql
insert into manufacturers (name, country, profiles, website, notes) values
('GMK',       'Germany',  array['cherry'], 'https://gmk.de',              'ABS doubleshot，Cherry 档标准'),
('Signature Plastics', 'USA', array['sa','dsa','dss'], 'https://pimpmykeyboard.com', 'SA/DSA 经典厂商'),
('KeyReative', 'China',   array['kat','kam'], 'https://keyreative.store',  'KAT/KAM 国产大厂'),
('Infinikey',  'China',   array['oem','cherry'], null,                     '国产中高端'),
('CannonKeys', 'USA',     array['oem','cherry'], 'https://cannonkeys.com', '团购平台兼厂商'),
('Drop',       'USA',     array['mt3','oem'], 'https://drop.com',          'MT3 档创造者');
