run:
	docker run --rm -v $(CURDIR)/public:/usr/share/nginx/html -v $(CURDIR)/nginx.conf:/etc/nginx/nginx.conf:ro -p 8002:80 nginx
