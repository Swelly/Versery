class User < ActiveRecord::Base

  has_many :poems
  has_and_belongs_to_many :titles
  has_many :favorites
  # has_many :poems, through: :favorites

  attr_accessible :provider,
                  :uid, :name, :email,
                  :twitter_oauth_token,
                  :twitter_oauth_secret,
                  :remember_me, :password,
                  :password_confirmation,
                  :bio, :url, :twitter_handle,
                  :word_count

  devise :database_authenticatable,
              :registerable, :recoverable,
              :rememberable, :trackable,
              :token_authenticatable,
              :timeoutable, :omniauthable

  def self.find_for_twitter_oauth(auth, signed_in_resource=nil)
    user = User.where(:provider => auth.provider, :uid => auth.uid).first
    if user && user.twitter_handle === nil
      user.twitter_handle = auth.extra.raw_info.screen_name
    end
    unless user
      user = User.create(
                          name:auth.extra.raw_info.name,
                          twitter_handle:auth.extra.raw_info.screen_name,
                          provider:auth.provider,
                          uid:auth.uid,
                          email:auth.info.email,
                          twitter_oauth_token: auth.credentials.token,
                          twitter_oauth_secret: auth.credentials.secret,
                          password:Devise.friendly_token[0,20],
                          word_count:0,
                          url: ''
                        )
    end
    return user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.twitter_data"] && session["devise.twitter_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end

end
