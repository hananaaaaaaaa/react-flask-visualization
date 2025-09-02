import sqlite3

class DatabaseManager:
    def __init__(self, db_path='../data/douban_top100.db'):
        self.db_path = db_path

    def get_rating_distribution(self):
        """获取评分分布"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT rating, COUNT(*) as count 
            FROM movies 
            GROUP BY rating 
            ORDER BY rating
        ''')
        data = [{'rating': row[0], 'count': row[1]} for row in cursor.fetchall()]
        conn.close()
        return data

    def get_year_distribution(self):
        """获取年份分布"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT release_year, COUNT(*) as count 
            FROM movies 
            WHERE release_year IS NOT NULL
            GROUP BY release_year 
            ORDER BY release_year
        ''')
        data = [{'year': row[0], 'count': row[1]} for row in cursor.fetchall()]
        conn.close()
        return data

    def get_country_distribution(self):
        """获取国家分布"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT country, COUNT(*) as count 
            FROM movies 
            WHERE country != '' 
            GROUP BY country 
            ORDER BY count DESC
        ''')
        data = [{'country': row[0], 'count': row[1]} for row in cursor.fetchall()]
        conn.close()
        return data

    def get_genre_distribution(self):
        """获取类型分布"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT genres FROM movies WHERE genres != ""')
        
        genre_count = {}
        for row in cursor.fetchall():
            genres = row[0].split(',')
            for genre in genres:
                genre = genre.strip()
                if genre:
                    genre_count[genre] = genre_count.get(genre, 0) + 1
        
        data = [{'genre': k, 'count': v} for k, v in genre_count.items()]
        data.sort(key=lambda x: x['count'], reverse=True)
        conn.close()
        return data
