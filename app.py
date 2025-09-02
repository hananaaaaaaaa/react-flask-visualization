from flask import Flask, jsonify
from flask_cors import CORS
from database import DatabaseManager

app = Flask(__name__)
CORS(app)
db = DatabaseManager()

@app.route('/api/rating_distribution', methods=['GET'])
def get_rating_distribution():
    """获取评分分布数据"""
    data = db.get_rating_distribution()
    return jsonify(data)

@app.route('/api/year_distribution', methods=['GET'])
def get_year_distribution():
    """获取年份分布数据"""
    data = db.get_year_distribution()
    return jsonify(data)

@app.route('/api/country_distribution', methods=['GET'])
def get_country_distribution():
    """获取国家分布数据"""
    data = db.get_country_distribution()
    return jsonify(data)

@app.route('/api/genre_distribution', methods=['GET'])
def get_genre_distribution():
    """获取类型分布数据"""
    data = db.get_genre_distribution()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
