import os

from get_gists import get_gists
from get_gists import flatten_json_data

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TARGET_DIR = os.path.abspath(os.path.join(CURRENT_DIR, 'src', 'js'))
PAGES_DIR = os.path.join(TARGET_DIR, 'data')
MAIN_JSON_DATA_FILENAME = 'gist_data_all.json'

get_gists.run("hibernationTheory", PAGES_DIR, "_til_")
flatten_json_data.run(PAGES_DIR, MAIN_JSON_DATA_FILENAME)

