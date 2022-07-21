from flaskContamML import app
# app is imported from __init__.py

# this conditional is only true if we run the script directly
if __name__ == '__main__':
    app.run(
        debug=True,
        port=5001
    )

