import os
import flask
import flask_cors
from resume_analyzer import ResumeAnalyzer, DocumentExtractor, ResumeComparator

app = flask.Flask(__name__)
flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/analyze', methods=['POST'])
def analyze():
    data = flask.request.json
    jd = data['jd']
    resume = data['resume']
    data = DocumentExtractor(resume).extract_entities()
    print('Extraction completed')
    sections_analyzer = ResumeAnalyzer(data=data, jd=jd)
    print('Reviewing the resume')
    scores, final_reviews, summaries = sections_analyzer.get_analysis()
    print('Analysis completed')
    return flask.jsonify(scores=scores, final_reviews=final_reviews, summaries=summaries)


@app.route('/compare', methods=['POST'])
def compare():
    data = flask.request.json
    jd = data['jd']
    resume1 = data['resume1']
    resume2 = data['resume2']
    data1 = DocumentExtractor(resume1).extract_entities()
    data2 = DocumentExtractor(resume2).extract_entities()
    comparator = ResumeComparator(resume1=data1, resume2=data2, jd=jd)
    comparison = comparator.get_comparision()
    return flask.jsonify(comparison=comparison)


@app.route('/test', methods=['GET'])
def test():
    return flask.jsonify({'message': 'Server is running!'})


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in flask.request.files:
        return flask.jsonify({'error': 'No file part'}), 400

    file = flask.request.files['file']

    if file.filename == '':
        return flask.jsonify({'error': 'No selected file'}), 400

    if file:
        if not os.path.exists('uploads'):
            os.makedirs('uploads')
        filepath = f"uploads/{file.filename}"
        file.save(filepath)
        return flask.jsonify({'message': 'File uploaded successfully', 'filepath': filepath}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
