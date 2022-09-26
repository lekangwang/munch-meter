from curses.ascii import isalpha
from flask import Blueprint, request, abort
from dotenv import load_dotenv
import openfoodfacts
import requests as r
import math

search_service = Blueprint("search_service", __name__)
load_dotenv()

# Return brand name if found
def get_brand(entry: dict) -> str:
    if not entry.get("brands_tags"):
        return None
    return entry.get("brands_tags")[0].capitalize()

# Return product name if found
def get_name(entry: dict) -> str:
    return entry.get("product_name")

# Return serving size as an int if found
def get_serving_size(entry: dict) -> int:
    if entry.get("serving_quantity") != None:
        return round(float(entry.get("serving_quantity")))
    return None

# Return unit of serving size if found
def get_serving_unit(entry: dict) -> str:
    if not entry.get("serving_size"):
        return None
    unit = ""
    for ch in entry["serving_size"]:
        if isalpha(ch):
            unit += ch
    return unit

# Convert kilojoules to kilacalories as an int
def kj_to_kcal(kj: float) -> int:
    return math.ceil(kj * 0.239006)

# Return calories per serving if found
def get_calories(nutrients: dict) -> int:
    calories = None 
    if nutrients.get("energy-kcal_serving") != None:
        calories = nutrients.get("energy-kcal_serving")
    elif nutrients.get("energy-kj_serving") != None:
        calories = kj_to_kcal(nutrients.get("energy-kj_serving"))
    else:
        return calories
    return round(float(calories))

# Return "kcal" as calorie units if found
def get_calories_unit(nutrients: dict) -> str:
    if get_calories(nutrients) != None:
        return "kcal"
    return None

# Return protein amount and unit for 1 serving if found
def get_proteins(nutrients: dict) -> tuple:
    if nutrients.get("proteins_serving") != None:
        return (round(float(nutrients.get("proteins_serving"))), nutrients.get("proteins_unit"))
    return (None, None)

# Return fat amount and unit for 1 serving if found
def get_fats(nutrients: dict) -> tuple:
    if nutrients.get("fat_serving") != None:
        return (round(float(nutrients.get("fat_serving"))), nutrients.get("fat_unit")) 
    return (None, None)

# Return carb amount and unit for 1 serving if found
def get_carbs(nutrients: dict) -> tuple:
    if nutrients.get("carbohydrates_serving") != None:
        return (round(float(nutrients.get("carbohydrates_serving"))), nutrients.get("carbohydrates_unit"))
    return (None, None)

# Verify that all the parameters of a food entry are present
def verify_filtered_entry(filtered_entry: dict) -> bool:
    for key in filtered_entry.keys():
        if filtered_entry[key] == None or filtered_entry[key] == "":
            return False
        elif isinstance(filtered_entry[key], dict):
            if not verify_filtered_entry(filtered_entry[key]):
                return False
    return True

# Return a new list, discarding None elements
def filter_out_none(l: list) -> list:
    return list(filter(lambda entry : entry != None, l))

# Format single raw API result to a usable format
# if any parameters are missing, return None
def filter_food_entry(entry: dict) -> dict:
    filtered_entry = {}
    filtered_entry["name"] = get_name(entry)
    filtered_entry["brand"] = get_brand(entry)
    filtered_entry["serving_size"] = get_serving_size(entry)
    filtered_entry["serving_unit"] = get_serving_unit(entry)

    nutrients = entry.get("nutriments") or entry.get("nutrients") # In-case the typo is fixed in API

    if nutrients == None:
        return None

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

# Query OpenFoodFacts API  
def query_food_api(search_term: str, page=1) -> list: 
    # Query API with the request parameters provided
    results = openfoodfacts.products.advanced_search({
        "search_terms": search_term,
        "page": page,
        "page_size": 24,
    })["products"]

    # Clean results returned from API
    cleaned_results = filter_out_none(list(map(filter_food_entry, results)))
    return cleaned_results

# Endpoint definition
@search_service.route("/search", methods=["GET"])
def main():
    search_term = request.args.get("query")
    page = request.args.get("page")
    search_results = query_food_api(search_term, page)

    # Return 404 error if no results found
    return search_results if len(search_results) > 0 else abort(404)