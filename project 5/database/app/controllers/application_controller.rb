class ApplicationController < ActionController::API
    def issue_token(data)
        JWT.encode(data, secret)
    end

    def get_current_user
        id = decoded_token['id']
        User.find_by(id: id)
    end

    def decoded_token
        token = request.headers['Authorization']
        begin
            JWT.decode(token, secret).first
        rescue JWT::DecodeError
            {}
        end
    end
    
    def secret
        ENV['API_SECRET']
    end
end
