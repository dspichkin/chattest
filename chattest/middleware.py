from django.http import HttpResponse

class DisableCSRF(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)
        return self.get_response(request)

    def process_exception(self, request, exception): 
        return HttpResponse("in exception")