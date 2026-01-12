-- Enable RLS on tables if not already enabled
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Authors Policies
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON authors;
CREATE POLICY "Enable all access for authenticated users" ON authors
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Posts Policies
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON posts;
CREATE POLICY "Enable all access for authenticated users" ON posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
