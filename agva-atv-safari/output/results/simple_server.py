#!/usr/bin/env python3
import http.server
import socketserver
import sys
import os

PORT = 8080

# Change to the directory containing the files to serve
os.chdir('/home/user/webapp/agva-atv-safari/output/results')

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stdout.write(f"{self.log_date_time_string()} - {format%args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"Server running on port {PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
