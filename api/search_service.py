from curses.ascii import isalnum, isalpha
from flask import Blueprint, request
from dotenv import load_dotenv
import openfoodfacts
import requests as r
import os
import math

search_service = Blueprint("search_service", __name__)
load_dotenv()

# Helper functions
def get_brand(entry):
    if not entry.get("brands_tags"):
        return None
    return entry.get("brands_tags")[0].capitalize()

def get_name(entry):
    return entry.get("product_name")

def get_serving_size(entry):
    return entry.get("serving_quantity")

def get_serving_unit(entry):
    if not entry.get("serving_size"):
        return None
    unit = ""
    for ch in entry["serving_size"]:
        if isalpha(ch):
            unit += ch
    return unit

def kj_to_kcal(kj):
    return math.ceil(kj * 0.239006)

def get_calories(nutrients):
    calories = None 
    if nutrients.get("energy-kcal_serving") != None:
        calories = nutrients.get("energy-kcal_serving")
    elif nutrients.get("energy-kj_serving") != None:
        calories = kj_to_kcal(nutrients.get("energy-kj_serving"))
    else:
        return None
    return calories

def get_calories_unit(nutrients):
    if nutrients.get("energy-kcal_serving") != None or nutrients.get("energy-kj_serving") != None:
        return "kcal"
    return None

def get_proteins(nutrients):
    if nutrients.get("proteins_serving") != None:
        return (nutrients.get("proteins_serving"), nutrients.get("proteins_unit"))
    return (None, None)

def get_fats(nutrients):
    if nutrients.get("fat_serving") != None:
        return (nutrients.get("fat_serving"), nutrients.get("fat_unit")) 
    return (None, None)

def get_carbs(nutrients):
    if nutrients.get("carbohydrates_serving") != None:
        return (nutrients.get("carbohydrates_serving"), nutrients.get("carbohydrates_unit")) 
    return (None, None)

def verify_filtered_entry(filtered_entry):
    for key in filtered_entry.keys():
        if filtered_entry[key] == None:
            return False
        elif isinstance(filtered_entry[key], dict):
            if not verify_filtered_entry(filtered_entry[key]):
                return False
    return True


def filter_food_entry(entry):
    filtered_entry = {}
    filtered_entry["name"] = get_name(entry)
    filtered_entry["brand"] = get_brand(entry)
    filtered_entry["serving_size"] = get_serving_size(entry)
    filtered_entry["serving_unit"] = get_serving_unit(entry)

    nutrients = entry["nutriments"] or entry["nutrients"] # in-case the typo is fixed

    filtered_entry["calories"] = {
        "value": get_calories(nutrients),
        "unit": get_calories_unit(nutrients)
    }

    filtered_entry["proteins"] = {
        "value": get_proteins(nutrients)[0],
        "unit": get_proteins(nutrients)[1]
    }

    filtered_entry["fats"] = {
        "value": get_fats(nutrients)[0],
        "unit": get_fats(nutrients)[1]
    }
    
    filtered_entry["carbs"] = {
        "value": get_carbs(nutrients)[0],
        "unit": get_carbs(nutrients)[1]
    }
    return filtered_entry if verify_filtered_entry(filtered_entry) else None
 
def query_food_api(search_term, page=1):
    results = openfoodfacts.products.advanced_search({
        "search_terms": search_term,
        "page_size": 24,
        "page": page,
    })["products"]

    return list(filter(lambda entry : entry != None, list(map(filter_food_entry, results))))

@search_service.route("/search", methods=["GET"])
def main():
    search_term = request.args.get("query")
    page_size = request.args.get("page_size")
    search_results = query_food_api(search_term, page_size)
    return search_results