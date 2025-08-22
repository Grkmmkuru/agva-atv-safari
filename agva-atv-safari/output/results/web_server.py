from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os

class MyHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stdout.write(f"{self.log_date_time_string()} - {format%args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    os.chdir('/home/user/webapp/agva-atv-safari/output/results')
    server = HTTPServer(('0.0.0.0', 8000), MyHandler)
    print("Server running on port 8000 - serving from: " + os.getcwd())
    sys.stdout.flush()
    server.serve_forever()
