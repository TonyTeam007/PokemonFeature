FROM python:3.10.1

RUN apt-get update && apt-get install -y libgl1-mesa-glx

WORKDIR /app

EXPOSE 8000

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY app /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]