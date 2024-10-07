def clean_json(json_string):
    return json_string.replace('```json', '').replace('```', '')