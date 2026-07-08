@echo off
echo.
echo  Installing dependencies...
python -m pip install flask flask-cors
echo.
echo  Starting Smt T.K.R. Polytechnic Flask Server...
echo  Open your browser at: http://127.0.0.1:5000
echo.
python app.py
pause
