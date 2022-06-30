# frozen_string_literal: true

json.timestamp (Time.zone.now - 1.minute).strftime '%Y-%m-%d %H:%M'
json.timenext @timenext.nil? ? '' : @timenext.strftime('%Y-%m-%d %H:%M')
json.changed_pictures @changed_pictures
json.aff_ids @aff_ids
json.pictures @pictures, partial: 'api/picture', as: :picture
json.stories @stories, partial: 'api/story', as: :story
json.categories @categories, partial: 'api/category', as: :category
json.promo @promos, partial: 'api/promo', as: :promo
json.changed_promo @changed_promos
